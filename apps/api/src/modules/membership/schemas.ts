import { z } from 'zod';

//CREATE MEMBERSHIP SCHEMA
export const createMembershipSchema = z.object({
    body: z.object({
        userId: z.string().uuid( 'User ID is required' ),
        organizationId: z.string().uuid( 'Organization ID is required' ),
        role: z.enum(['operator', 'admin']).default('operator')
    })
});

//GET MEMBERSHIP SCHEMA
export const getMembershipSchema = z.object({
    params: z.object({
        userId: z.string().uuid( 'User ID is required' )
    })
});

//LIST MEMBERSHIPS SCHEMA
export const listMembershipsSchema = z.object({
    query: z.object({
        page: z.string().regex(/^\d+$/).transform(Number).optional(),
        limit: z.string().regex(/^\d+$/).transform(Number).optional()
    })
});

//UPDATE MEMBERSHIP SCHEMA
export const updateMembershipSchema = z.object({
    params: z.object({
        userId: z.string().uuid( 'User ID is required' )
    }),
    body: z.object({
        role: z.enum(['operator', 'admin']).optional()
    })
});

//DELETE MEMBERSHIP SCHEMA
export const deleteMembershipSchema = z.object({
    params: z.object({
        userId: z.string().uuid( 'User ID is required' )
    })
});