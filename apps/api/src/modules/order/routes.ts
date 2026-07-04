import { Router } from "express";
import { OrderController } from "./controllers/OrderController.ts";

const router = Router();
const orderController = new OrderController();

//POST /api/v1/:organizationId/orders
router.post(
    '/:organizationId/orders',
    orderController.createOrder
);

//GET /api/v1/:organizationId/orders/:orderId
router.get(
    '/:organizationId/orders/:orderId',
    orderController.getOrder
);

//GET /api/v1/:organizationId/orders
router.get(
    '/:organizationId/orders',
    orderController.listOrder
);  

//PUT /api/v1/:organizationId/orders/:orderId
router.put(
    '/:organizationId/orders/:orderId',
    orderController.updateOrderStatus
);

//DELETE /api/v1/:organizationId/orders/:orderId
router.delete(
    '/:organizationId/orders/:orderId',
    orderController.deleteOrder
);

export { router as orderRouter };