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
            next ( error );
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
            const order = await orderService.getOrder(orderId, organizationId);
            return res.status(200).json(order);
        } catch ( error ){
            next( error );
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
            const orders = await orderService.listOrders(organizationId, { status: status as OrderTypes.OrderStatus });
            return res.status(200).json(orders);
        } catch( error ){
            next( error );
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

            const updateOrder = await orderService.updateOrderStatus(orderId, organizationId, data);
            return res.status(200).json(updateOrder);
        } catch( error ){
            next( error );
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

            const deleteOrder = await orderService.deleteOrder( orderId, organizationId);
            return res.status(204);
        } catch( error ){
            next( error );
        }
    }

}