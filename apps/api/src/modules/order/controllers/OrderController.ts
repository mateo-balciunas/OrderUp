import { Request, Response, NextFunction } from "express";
import * as OrderTypes from "../types.js";
import { OrderService } from "../services/OrderService.js";

const orderService = new OrderService();

export class OrderController {

    //POST /api/v1/:organizationId/orders
    async createOrder( req: Request, res: Response, next: NextFunction) {
        try {
            //Extract data and validate
            const { organizationId } = req.params; 
            if ( !organizationId) {
                return res.status(400).json({ message: 'Organization ID is required', status: 'error' });
            }
            const data = req.body;
            if (data.organizationId !== organizationId) {
                return res.status(400).json({ message: 'Organization ID mismatch', status: 'error' });
            }

            const order = await orderService.createOrder(data);

            return res.status(201).json(order)

        } catch( error ) {
            return next ( error );
        }
    }

    //GET /api/v1/:organizationId/orders/:orderId
    async getOrder( req: Request, res: Response, next: NextFunction){
        try {
            //Extract data and validate
            const { orderId, organizationId } = req.params;

            if (!orderId || !organizationId) {
                return res.status(400).json({ message: 'OrderId and OrganizationId are required', status: 'error' });
            }
            const order = await orderService.getOrder(orderId as string, organizationId as string);
            return res.status(200).json(order);
        } catch ( error ){
            return next( error );
        }
    };

    //GET /api/v1/:organzationId/orders?status=validated
    async listOrder( req: Request, res: Response, next: NextFunction ){
        try {
            //Extract data and validate
            const { organizationId } = req.params;
            if( !organizationId ) {
                return res.status(400).json({ message: 'Organization ID is required', status: 'error' });
            };
            const { status } = req.query;
            const statusValue = Array.isArray(status) ? status[0] : status;
            const orders = await orderService.listOrders(organizationId as string, { status: statusValue as OrderTypes.OrderStatus });
            return res.status(200).json(orders);
        } catch( error ){
            return next( error );
        }
    }

    //PUT /api/v1/:organizationId/orders/:orderId/status
    async updateOrderStatus( req: Request, res: Response, next: NextFunction ){
        try {
            //Extract data and validate
            const { orderId, organizationId } = req.params;
            if( !orderId || !organizationId ){
                return res.status(400).json({ message: 'OrderId and OrganizationId are required', status: 'error'});
            };
            const data = req.body;

            const updateOrder = await orderService.updateOrderStatus(orderId as string, organizationId as string, data);
            return res.status(200).json(updateOrder);
        } catch( error ){
            return next( error );
        }
    }

    //DELETE /api/v1/:organizationId/orders/:orderId
    async deleteOrder( req: Request, res: Response, next: NextFunction ){
        try {
            //Extract data and validate
            const { orderId, organizationId } = req.params;
            if( !orderId || !organizationId ){
                return res.status(400).json({ message: 'OrderId and OrganizationId are required', status: 'error' });
            };

            await orderService.deleteOrder( orderId as string, organizationId as string);
            return res.status(204);
        } catch( error ){
            return next( error );
        }
    }

}