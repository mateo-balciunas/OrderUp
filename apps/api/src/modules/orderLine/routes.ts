import { Router } from "express";
import { OrderLineController } from "./controllers/OrderLineController.ts";

const router = Router();
const orderLineController = new OrderLineController();

//POST /api/v1/orderLines
router.post(
    '/orderLines',
    orderLineController.createOrderLine
);

//GET /api/v1/orderLines/:orderLineId
router.get(
    '/orderLines/:orderLineId',
    orderLineController.getOrderLine
);

//GET /api/v1/orderLines
router.get(
    '/orderLines',
    orderLineController.listOrderLines
);

//PUT /api/v1/orderLines/:orderLineId
router.put(
    '/orderLines/:orderLineId',
    orderLineController.updateOrderLine
);

//DELETE /api/v1/orderLines/:orderLineId
router.delete(
    '/orderLines/:orderLineId',
    orderLineController.deleteOrderLine
);

export { router as orderLineRouter };