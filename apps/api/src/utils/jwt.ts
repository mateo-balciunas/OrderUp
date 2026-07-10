import jwt from 'jsonwebtoken';
import { BadRequestError, InternalServerError, UnauthorizedError } from './errors.js';

const secret = process.env.JWT_SECRET;
const expiresIn = process.env.JWT_EXPIRES_IN;

if( !secret ) {
    throw new Error('JWT_SECRET is not set');
}

if( !expiresIn ) {
    throw new Error('JWT_EXPIRES_IN is not set');
}

const JWT_SECRET: string = secret;
const JWT_EXPIRES_IN: string = expiresIn;

interface Payload {
    userId: string;
    organizationId: string;
    role: string;
}

export interface DecodedToken extends Payload {
    iat: number;
    exp: number;
}

export const generateToken = (payload: Payload) => {
    const { userId, organizationId, role } = payload;
    if( !userId || !organizationId || !role ) {

        throw new BadRequestError('Missing required fields from payload');
    }
    try{
        const token = jwt.sign(
            payload, 
            JWT_SECRET, 
            { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions);
        return token;
    } catch( error ) {
        throw new InternalServerError('Failed to generate token');
    }
}

export const verifyToken = (token: string): DecodedToken => {
    try {
        const decoded = jwt.verify(token, secret as string);
        return decoded as DecodedToken;
    } catch( error ) {
        throw new UnauthorizedError('Invalid token');
    }
}