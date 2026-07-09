import { Router } from "express";
import { OrderController } from "./controllers/OrderController.js";
import { validate } from "../../middleware/validation.middleware.ts";
import {
    createOrderSchema,
    getOrderSchema,
    listOrdersSchema,
    updateOrderStatusSchema,
    deleteOrderSchema
} from "./schemas.js";

const router = Router();
const orderController = new OrderController();

//POST /api/v1/:organizationId/orders
router.post(
    '/:organizationId/orders',
    validate(createOrderSchema),
    orderController.createOrder
);

//GET /api/v1/:organizationId/orders/:orderId
router.get(
    '/:organizationId/orders/:orderId',
    validate(getOrderSchema),
    orderController.getOrder
);

//GET /api/v1/:organizationId/orders
router.get(
    '/:organizationId/orders',
    validate(listOrdersSchema),
    orderController.listOrder
);  

//PUT /api/v1/:organizationId/orders/:orderId
router.put(
    '/:organizationId/orders/:orderId',
    validate(updateOrderStatusSchema),
    orderController.updateOrderStatus
);

//DELETE /api/v1/:organizationId/orders/:orderId
router.delete(
    '/:organizationId/orders/:orderId',
    validate(deleteOrderSchema),
    orderController.deleteOrder
);

export { router as orderRouter };