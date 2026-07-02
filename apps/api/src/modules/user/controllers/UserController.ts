import { Request, Response, NextFunction } from 'express';
import * as UserTypes from '../types.js';
import { UserService } from '../services/UserService.js';

const userService = new UserService();

export class UserController {

    //POST /api/v1/users
    async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            //Extract and validate userId
            const { organizationId } = req.params;
            if( !organizationId ){
                return res.status(400).json({ message: 'ORganization ID is required', status: 'error' });
            }
            
            //Extract and validate user data
            const { email, name, password  } = req.body;
            if( !email || !name || !password ){
                return res.status(400).json({ message: 'Email, name and password are required', status: 'error' });
            }

            const newUser = await userService.createUser( { email, name, password });
            return res.status(201).json(newUser);
        } catch( error ){
            return next( error );
        }
    }

    //GET /api/v1/users/:userId
    async getUser( req: Request, res: Response, next: NextFunction ){
        try {
            //Extract and validate organizationId and userId
            const { userId } = req.params;
            if( !userId ){
                return res.status(400).json({ message: 'User ID are required', status: 'error' });
            }

            const getUser = await userService.getUser( userId as string );
            return res.status(200).json(getUser);

        } catch( error ){
            return next( error );
        }
    }

    //GET /api/v1/users
    async listUsers( req: Request, res: Response, next: NextFunction ) {
        try {

            const listUsers = await userService.listUsers();
            return res.status(200).json({
                users: listUsers.users,
                total: listUsers.total,
                page: 1,
                limit: listUsers.limit
            });

        } catch( error ){
            return next( error );
        }
    }

    //PUT /api/v1/users/:userId
    async updateUser( req: Request, res: Response, next: NextFunction ){
        try {
            //Extract and validate organizationId and userId
            const  { userId } = req.params;
            if( !userId ){
                return res.status(400).json({ message: 'user ID are required' , status: 'error' });
            }
            //Extract and validate user data
            const { email, name, password } = req.body;
            
            const updateUser = await userService.updateUser( userId as string, { email, name, password });
            return res.status(200).json(updateUser);

        } catch( error ){
            return next( error );
        }
    }

    //DELETE /api/v1/users/:userId
    async deleteUser( req: Request, res: Response, next: NextFunction ){
        try {
            //Extract and validate organizationId and userId
            const { userId } = req.params;
            if( !userId ){
                return res.status(400).json({ message: 'User ID are required', status: 'error' });
            }

            await userService.deleteUser( userId as string );
            return res.status(204);
        } catch( error ){
            return next( error );
        }
    }
}