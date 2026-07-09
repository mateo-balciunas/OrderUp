import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodSchema } from 'zod';

/**
 *  Generic middleware to validate request body, params and query using Zod schemas
 * @param schema Schema to validate the request
 * @returns Express middleware function
 * 
 * @example
 * router.post(
 * '/:organizationId/users',
 * validate(createUserSchema),
 * userController.createUser
 * );
 */

export const validate = (schema: ZodSchema) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
        try {
            await schema.parseAsync({
                body: req.body,
                params: req.params,
                query: req.query
            });

            next();
        } catch( error ){
            if ( error instanceof ZodError ) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Validation error',
                    errors: error.errors.map( err => ({
                        field: err.path.join('.'),
                        message: err.message,
                        code: err.code,
                    }))
                });
            }

            next( error );
        }
    }
}