import { z } from 'zod';

export const CreateOrderSchema = z.object({
    organizationId: z.string().uuid(),
    externalRef: z.string(),
    channelId: z.string(),
    total: z.number().positive(),
});

export type CreateOrderRequest = z.infer<typeof CreateOrderSchema>;