import * as OrderTypes from '../types.js';
import { prisma } from '@orderup/db';
import { NotFoundError, ConflictError  } from '../../../utils/errors.js';


export class OrderService {

    // ============
    // CREATE ORDER
    // ============
    async createOrder(data: OrderTypes.CreateOrderRequest): Promise<OrderTypes.OrderResponse> {
        //Validate organizationId
        const organizationId = await prisma.organization.findUnique({
            where: { id: data.organizationId }
        });

        if (!organizationId) {
            throw new Error('Organization not found');
        };

        //Create order with 'recieved' status
        const order = await prisma.order.findFirst({
            where: { organizationId: data.organizationId }
        });
        if (order) {
            throw new ConflictError('Order already exists');
        }

        //Calculate total
        const calculatedTotal = data.lines.reduce(
            (sum, line) => sum + (line.quantity * line.unitPrice), 0
        );

        //Create Order + Lines + StatusHistory with transaction

        const newOrder = await prisma.order.create({
            data: {
                organizationId: data.organizationId,
                externalRef: data.externalRef,
                channelId: data.channelId,
                status: 'received',
                total: calculatedTotal,
                metadata: data.metadata || {},
                priority: data.priority || 0,
                lines: {
                    create: data.lines.map(line => ({
                        sku: line.sku,
                        quantity: line.quantity,
                        unit: line.unit || 'pcs',
                        unitPrice: line.unitPrice,
                        total: line.quantity * line.unitPrice,
                        metadata: {}
                    }))
                },
                statusHistory: {
                    create: {
                        previousStatus: null,
                        newStatus: 'received',
                        reason: 'Order created',
                        userId: null
                    }
                }
            },
            include: {
                lines: true,

            },
        });

        return newOrder;
    }

    // ============
    //GET ORDER
    // ============
    async getOrder( orderId: string, organizationId: string ):Promise<OrderTypes.GetOrderResponse> {
        //Search for order
        const order = await prisma.order.findFirst({
            where: { id: orderId, organizationId: organizationId },
            include: { lines: true, statusHistory: true },
        });

        if (!order) {
            throw new NotFoundError('Order not found');
        };

        return order;
    };

    // ============
    //LIST ORDERS
    // ============
    async listOrders( organizationId: string, filters?: { status?: string }): Promise<OrderTypes.ListOrdersResponse>{
        //Create dynamic object
        const where = {
            organizationId,
            ...(filters?.status && { status: filters.status })
        }

        const orders = await prisma.order.findMany({
            where,
            include: {
                lines: true,
            },
            orderBy: {
                createdAt: 'desc',
            }
        });
        return {
            orders: orders,
            total: orders.length,
            page: 1,
            limit: orders.length
        };
    }

    // ============
    //UPDATE ORDER STATUS
    //=============
    async updateOrderStatus ( orderId: string, organizationId: string, data: OrderTypes.UpdateOrderStatusRequest ): Promise<OrderTypes.UpdateOrderStatusResponse> {
        //Get current order
        const currentOrder = await prisma.order.findFirst({
            where: { id: orderId, organizationId: organizationId },
            include: { lines: true, statusHistory: true },
        });
        if( !currentOrder ){
            throw new NotFoundError('Order not found');
        };
        //Save previous status
        const previousStatus = currentOrder.status;

        //Update order status
        const updateOrder = await prisma.order.update({
            where: { id: orderId },
            data: {
                status: data.status,
                statusHistory: {
                    create: {
                        previousStatus,
                        newStatus: data.status,
                        reason: data.reason || '',
                        userId: data.userId || null
                    }
                }
            },
            include: {
                lines: true,
                statusHistory: {
                    orderBy: { createdAt: 'desc' }
                }
            }
        });

        return updateOrder;
    }

    // ============
    //DELETE ORDER
    //=============
    async deleteOrder( orderId: string, organizationId: string ): Promise <OrderTypes.DeleteOrderResponse> {
        //Check if order exists
        const order = await prisma.order.findFirst({
            where: { id: orderId, organizationId: organizationId }
        });
        if( !order ){
            throw new NotFoundError( 'Order not found' );
        };

        //Delete order
        await prisma.order.delete({
            where: { id: orderId },
        });
        return {
            id: orderId,
            organizationId: organizationId,
        };
    }
}