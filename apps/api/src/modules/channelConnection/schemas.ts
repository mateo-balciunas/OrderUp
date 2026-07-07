import { z } from 'zod';

//CREATE CHANNEL CONNECTION SCHEMA
export const createChannelConnectionSchema = z.object({
    body: z.object({
        channelType: z.string().min(1, 'Channel Type is required' ),
        name: z.string().min(1, 'Name is required' ),
        config: z.record(z.any()).optional(),
        isActive: z.boolean().optional(),
    }),
    params: z.object({
        organizationId: z.string().uuid( 'Organization ID is required' )
    })
});

//GET CHANNEL CONNECTION SCHEMA
export const getChannelConnectionSchema = z.object({
    params: z.object({
        organizationId: z.string().uuid( 'Organization ID is required' ),
        channelId: z.string().min(1, 'Channel ID is required' )
    })
});

//LIST CHANNEL CONNECTIONS SCHEMA
export const listChannelConnectionsSchema = z.object({
    params: z.object({
        organizationId: z.string().uuid( 'Organization ID is required' )
    }),
    query: z.object({
        page: z.string().regex(/^\d+$/).transform(Number).optional(),
        limit: z.string().regex(/^\d+$/).transform(Number).optional()
    })
});

//UPDATE CHANNEL CONNECTION SCHEMA
export const updateChannelConnectionSchema = z.object({
    params: z.object({
        organizationId: z.string().uuid( 'Organization ID is required' ),
        channelId: z.string().min(1, 'Channel ID is required' )
    }),
    body: z.object({
        channelType: z.string().optional(),
        name: z.string().optional(),
        config: z.record(z.any()).optional(),
        isActive: z.boolean().optional(),
    })
});

//DELETE CHANNEL CONNECTION SCHEMA
export const deleteChannelConnectionSchema = z.object({
    params: z.object({
        organizationId: z.string().uuid( 'Organization ID is required' ),
        channelId: z.string().min(1, 'Channel ID is required' )
    })
});