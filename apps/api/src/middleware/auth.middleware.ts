import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '../utils/errors.js';
import { verifyToken } from '../utils/jwt.js';


export const authenticate = ( req: Request, res: Response, next: NextFunction ) => {
    try {
        const authHeader = req.headers.authorization;
        if( !authHeader ){
            throw new UnauthorizedError('Unauthorized');
        }
        if( !authHeader.startsWith('Bearer ')){
            throw new UnauthorizedError('Token not provided');
        }
        const token = authHeader.split(' ')[1];
        const decoded = verifyToken( token );

        req.user = decoded;
        next();
    } catch( error ){
        return next( error );
    }
}