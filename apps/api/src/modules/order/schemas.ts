import { z } from 'zod';

//CREATE ORDER SCHEMA
export const createOrderSchema = z.object({
    body: z.object({
        externalRef: z.string().min(1, 'External Reference is required' ),
        channelId: z.string().min(1, 'Channel ID is required' ),
        status: z.enum(['received', 'confirmed', 'cancelled']).default('received'),
        metadata: z.record(z.any()).optional(),
        priority: z.number().min(1, 'Priority must be at least 1' ).default(1),
        lines: z.array(z.object({
            sku: z.string().min(1, 'SKU is required' ),
            quantity: z.number().min(1, 'Quantity must be at least 1' ),
            unit: z.string().optional(),
            unitPrice: z.number().min(0, 'Unit Price must be at least 0' )
        })),
    }),
    params: z.object({
        organizationId: z.string().uuid( 'Organization ID is required' )
    })
});

//GET ORDER SCHEMA
export const getOrderSchema = z.object({
    params: z.object({
        organizationId: z.string().uuid( 'Organization ID is required' ),
        orderId: z.string().uuid( 'Order ID is required' )
    })
});

//LIST ORDERS SCHEMA
export const listOrdersSchema = z.object({
    params: z.object({
        organizationId: z.string().uuid( 'Organization ID is required' )
    }),
    query: z.object({
        page: z.string().regex(/^\d+$/).transform(Number).optional(),
        limit: z.string().regex(/^\d+$/).transform(Number).optional()
    })
});

//UPDATE ORDER STATUS SCHEMA
export const updateOrderStatusSchema = z.object({
    params: z.object({
        organizationId: z.string().uuid( 'Organization ID is required' ),
        orderId: z.string().uuid( 'Order ID is required' )
    }),
    body: z.object({
        status: z.enum(['recieved', 'confirmed', 'cancelled']).optional(),
        reason: z.string().optional(),
        userId: z.string().uuid( 'User ID is required' ).optional()
    })
});

//DELETE ORDER SCHEMA
export const deleteOrderSchema = z.object({
    params: z.object({
        organizationId: z.string().uuid( 'Organization ID is required' ),
        orderId: z.string().uuid( 'Order ID is required' )
    })
});

//GET ORDER STATUS HISTORY SCHEMA
export const getOrderStatusHistorySchema = z.object({
    params: z.object({
        organizationId: z.string().uuid( 'Organization ID is required' ),
        orderId: z.string().uuid('Order ID is required')
    }),
    query: z.object({
        page: z.string().regex(/^\d+$/).transform(Number).optional(),
        limit: z.string().regex(/^\d+$/).transform(Number).optional()
    })
});