import { z } from "zod";

// CREATE USER SCHEMA
export const createUserSchema = z.object({
    body: z.object({
        email: z.string().email( 'Invalid Email' ),
        name: z.string().min( 3, 'Name must be at least 3 characters long' ),
        password: z.string().min(8, 'Password must be at least 8 characters long' )
    }),
    params: z.object({
        organizationId: z.string().uuid( ' Organization ID is required' )
    })
});

//GET USER SCHEMA
export const getUserSchema = z.object({
    params: z.object({
        organizationId: z.string().uuid( ' Organization ID is required' ),
        userId: z.string().uuid( ' User ID is required' )
    })
});

//LIST USERS SCHEMA
export const listUsersSchema = z.object({
    params: z.object({
        organizationId: z.string().uuid( ' Organization ID is required' )
    }),
    query: z.object({
        page: z.string().regex(/^\d+$/).transform(Number).optional(),
        limit: z.string().regex(/^\d+$/).transform(Number).optional()
    })
});

// UPDATE USER SCHEMA
export const updateUserSchema = z.object({
    body: z.object({
        email: z.string().email( 'Invalid Email' ),
        name: z.string().min( 3, 'Name must be at least 3 characters long' ),
        password: z.string().min(8, 'Password must be at least 8 characters long' )
    }).refine( data => Object.keys( data ).length > 0, {
        message: 'At least one field is required'
    }),
    params: z.object({
        organizationId: z.string().uuid( ' Organization ID is required' ),
        userId: z.string().uuid( ' User ID is required' )
    })
});

//DELETE USER SCHEMA
export const deleteUserSchema = z.object({
    params: z.object({
        organizationId: z.string().uuid( 'Organization ID is required' ),
        userId: z.string().uuid( 'User ID is required' )
    })
});
