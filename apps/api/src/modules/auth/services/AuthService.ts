import { prisma } from '@orderup/db';
import { BadRequestError, UnauthorizedError } from '../../../utils/errors.js';
import { DecodedToken, generateToken, verifyToken } from '../../../utils/jwt.js';
import * as bcrypt from 'bcrypt';
import * as AuthTypes from '../types.js';

export class AuthService {

    async login( { email, password }: AuthTypes.LoginRequest ): Promise<AuthTypes.LoginResponse> {
        //Validate user
        const user = await prisma.user.findUnique({
            where: { email: email },
            include: {
                memberships: true,
            }
        });
        if( !user ){
            throw new UnauthorizedError('Invalid credentials');
        }

        //Compare and validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if( !isPasswordValid ){
            throw new UnauthorizedError('Invalid credentials');
        }
        if( user.memberships.length === 0 ){
            throw new UnauthorizedError('User has no memberships');
        }
        const membership = user.memberships[0];
        const payload = { userId: user.id, organizationId: membership.organizationId, role: membership.role }
        const accessToken =  generateToken(payload);

        return {
            accessToken: accessToken,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: membership.role,
            }
        }
    }

    async logout( accessToken: string ): Promise<void> {
        const decoded = verifyToken(accessToken);
        if( !decoded ){
            throw new UnauthorizedError('Invalid token');
        }
    }

    async getCurrentUser( accessToken: string): Promise<AuthTypes.CurrentUserResponse> {
        const decoded: DecodedToken = verifyToken( accessToken );

        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            include: {
                memberships: true,
            }
        });
        if( !user ){
            throw new UnauthorizedError('User not found');
        }
        if( user.memberships.length === 0 ){
            throw new UnauthorizedError('User has no memberships');
        }
        const membership = user.memberships[0];
        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: membership.role,
                organizationId: membership.organizationId,
            }
        }
    }

    async registerUser({ email, name, password }: AuthTypes.RegisterUserRequest): Promise<AuthTypes.RegisterUserResponse> {
        //Validate user
        const user = await prisma.user.findUnique({
            where: { email: email }
        });
        if( user){
            throw new BadRequestError('User already exists');
        }
        //Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        //Create user
        const result = await prisma.$transaction(async (tx) => {
            const newUser = await tx.user.create({
                data: {
                    email: email,
                    name: name,
                    password: hashedPassword,
                }
            });
            const organization = await tx.organization.create({
                data: {
                    name: `${name}'s Organization`
                }
            });
            const membership = await tx.membership.create({
                data: {
                    userId: newUser.id,
                    organizationId: organization.id,
                    role: 'admin'
                }
            });
            return { newUser, organization, membership };
        });

        const payload = {
            userId: result.newUser.id,
            organizationId: result.organization.id,
            role: result.membership.role
        };

        const accessToken = generateToken( payload );

        return {
            accessToken: accessToken,
            user: {
                id: result.newUser.id,
                email: result.newUser.email,
                name: result.newUser.name,
                role: result.membership.role,
            }
        }
    }
}