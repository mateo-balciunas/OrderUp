import { z } from 'zod';

//CREATE ORGANIZATION SCHEMA
export const createOrganizationSchema = z.object({
    body: z.object({
        name: z.string().min(3, 'Name must be at least 3 characters long'),
        plan: z.enum(['basic', 'pro']).default('basic'),
    })
});

//GET ORGANIZATION SCHEMA
export const getOrganizationSchema = z.object({
    params: z.object({
        organizationId: z.string().uuid( 'Organization ID is required' )
    })
});

//LIST ORGANIZATIONS SCHEMA
export const listOrganizationsSchema = z.object({
    query: z.object({
        page: z.string().regex(/^\d+$/).transform(Number).optional(),
        limit: z.string().regex(/^\d+$/).transform(Number).optional()
    })
});

//UPDATE ORGANIZATION SCHEMA
export const updateOrganizationSchema = z.object({
    body: z.object({
        name: z.string().min(3, 'Name must be at least 3 characters long'),
        plan: z.enum(['basic', 'pro']).optional(),
    }).refine( data => Object.keys( data ).length > 0, {
        message: 'At least one field is required'
    }),
    params: z.object({
        organizationId: z.string().uuid( 'Organization ID is required' )
    })
});

//DELETE ORGANIZATION SCHEMA
export const deleteOrganizationSchema = z.object({
    params: z.object({
        organizationId: z.string().uuid( 'Organization ID is required' )
    })
});