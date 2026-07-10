import { AuthService } from '../services/AuthService.js';
import { NextFunction, Request, Response } from 'express';

const authService = new AuthService();

export class AuthController {

    //POST /api/v1/auth/login
    async login( req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            if( !email || !password ){
                return res.status(400).json({ message: 'Email and password are required', status: 'error' });
            }

            const loginResponse = await authService.login({ email, password });
            return res.status(200).json(loginResponse);
        } catch( error ){
            return next( error );
        }
    }

    //GET /api/v1/auth/current-user
    async getCurrentUser( req: Request, res: Response, next: NextFunction ){
        try { 
            const authHeader = req.headers.authorization;
            if( !authHeader ){
                return res.status(401).json({ message: 'Unauthorized', status: 'error' });
            }
            if( !authHeader.startsWith('Bearer ')){
                return res.status(401).json({ message: 'Invalid token format', status: 'error' });
            }
            const token = authHeader.split(' ')[1];

            const currentUserResponse = await authService.getCurrentUser( token );
            return res.status(200).json(currentUserResponse);
        } catch( error ){
            return next( error );
        }
    }

    //POST /api/v1/auth/register
    async register( req: Request, res: Response, next: NextFunction ){
        try {
            const { email, name, password } = req.body;
            if( !email || !name || !password ){
                return res.status(400).json({ message: 'Email, name, and password are required', status: 'error' });
            }

            const registerUser = await authService.registerUser({ email, name, password });
            return res.status(201).json(registerUser);
        } catch( error ){
            return next( error );
        }
    }
}