import { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils/errors.js';

export const errorHandler = ( err: Error, req: Request, res: Response, next: NextFunction ): void => {
    let statusCode = 500;
    let message = err.message || 'Internal server error';


    if( err instanceof AppError ){
        statusCode = err.statusCode;
        message = err.message;
    }
    else if( (err as any).code && (err as any).code.startsWith('P') ){
        const prismaCode = (err as any).code;

        switch( prismaCode ){
            case 'P2002':
                statusCode = 409;
                message = 'Resource already exists';
                break;
            case 'P2025':
                statusCode = 404;
                message = 'Resource not found';
                break;
            case 'P2003':
                statusCode = 400;
                message = 'Foreign key constraint failed';
                break;
            case 'P1001':
                statusCode = 503;
                message = 'Cannot reach database';
                break;
            case 'P2014':
                statusCode = 400;
                message = 'Invalid ID provided';
                break;
            case 'P2011':
                statusCode = 400;
                message = 'Required field is missing';
                break;
            default:
                statusCode = 500;
                message = 'Internal server error';
                break;
        }
    }
    else{
        statusCode = 500;
        message = 'Internal server error';
    }

    if( process.env.NODE_ENV === 'development') {
        console.error( 'Error:', err);
        console.error( 'Stack:', err.stack);
    } else {
        console.error({
            message: message,
            statusCode: statusCode,
            path: req.path,
            method: req.method,
            timestamp: new Date().toISOString()
        });
    }

    res.status(statusCode).json({
        status: 'error',
        message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });

}