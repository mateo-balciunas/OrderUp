import { z } from 'zod';

//LOGIN SCHEMA
export const loginSchema = z.object({
    body: z.object({
        email: z.string().email( 'Invalid Email' ),
        password: z.string().min(8, 'Password must be at least 8 characters long' )
    })
});

//REGISTER USER SCHEMA
export const registerUserSchema = z.object({
    body: z.object({
        email: z.string().email( 'Invalid Email' ),
        name: z.string().min(3, 'Name must be at least 3 characters long' ),
        password: z.string().min(8, 'Password must be at least 8 characters long' )
    })
});