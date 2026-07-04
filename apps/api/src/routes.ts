import { Router } from "express";
import { userRouter } from "./modules/user/routes.ts";
import { organizationRouter } from "./modules/organization/routes.ts";
import { orderLineRouter } from "./modules/orderLine/routes.ts";
import { orderRouter } from "./modules/order/routes.ts";
import { membershipRouter } from "./modules/membership/routes.ts";
import { channelConnectionRouter } from "./modules/channelConnection/routes.ts";

const router = Router();

router.use('/api/v1', userRouter);
router.use('/api/v1', organizationRouter);
router.use('/api/v1', orderLineRouter);
router.use('/api/v1', orderRouter);
router.use('/api/v1', membershipRouter);
router.use('/api/v1', channelConnectionRouter);

export { router as apiRouter };