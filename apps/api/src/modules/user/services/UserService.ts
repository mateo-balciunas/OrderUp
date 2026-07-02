import * as UserTypes from '../types.js';
import * as bcrypt from 'bcrypt';
import { prisma } from '@orderup/db';

export class UserService {

    // ============
    // CREATE USER
    // ============
    async createUser( { email, name, password }: UserTypes.CreateUserRequest): Promise<UserTypes.UserResponse> {

        //Validate user
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
        if( existingUser ){
            throw new Error('User already exists');
        }

        //Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        //Create user
        const newUser = await prisma.user.create({
            data: {
                email: email,
                name: name,
                password: hashedPassword
            },
            include: {
                memberships: true
            }
        });
        return {
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
            createdAt: newUser.createdAt,
            updatedAt: newUser.updatedAt,
            memberships: newUser.memberships
        }
    };

    // ============
    // GET USER
    // ============
    async getUser( userId: string ): Promise<UserTypes.UserResponse> {
        //Search for user
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                memberships: true
            }
        });

        if( !user ) {
            throw new Error('User not found');
        }

        return user;
    }

    // ============
    // LIST USERS
    // ============
    async listUsers(): Promise<UserTypes.ListUserResponses> {
        //Search for users
        const users = await prisma.user.findMany({
            include: {
                memberships: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return {
            users: users,
            total: users.length,
            page: 1,
            limit: users.length
        };
    }

    // ============
    // UPDATE USER
    // ============
    async updateUser( userId: string, { email, name, password }: UserTypes.UpdateUserRequest): Promise<UserTypes.UserResponse> {
        //Search for user
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                memberships: true
            }
        });

        if( !user ){
            throw new Error( 'User not found' );
        }
        //Update user
        const updateUser = await prisma.user.update({
            where: { id: userId },
            data: {
                email: email || user.email,
                name: name || user.name,
                password: password ? await bcrypt.hash(password, 10) : user.password,
                createdAt: user.createdAt,
                updatedAt: new Date(),
                memberships: user.memberships
            }
        });

        return {
            id: updateUser.id,
            email: updateUser.email,
            name: updateUser.name,
            createdAt: user.createdAt,
            updatedAt: new Date(),
            memberships: updateUser.memberships
        }
    }

    // ============
    // DELETE USER
    // ============
    async deleteUser( userId: string ): Promise<UserTypes.DeleteUserResponse> {
        //Search for user
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                memberships: true
            }
        });
        if( !user ) {
            throw new Error( 'User not found' );
        }

        //Delete user
        await prisma.user.delete({
            where: { id: userId },
        });
        return {
            id: userId
        }

    }
}