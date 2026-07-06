import { Router } from "express";
import { userRouter } from "./modules/user/routes.js";
import { organizationRouter } from "./modules/organization/routes.js";
import { orderRouter } from "./modules/order/routes.js";
import { membershipRouter } from "./modules/membership/routes.js";
import { channelConnectionRouter } from "./modules/channelConnection/routes.js";

const router = Router();

router.use(userRouter);
router.use(organizationRouter);
router.use(orderRouter);
router.use(membershipRouter);
router.use(channelConnectionRouter);

export { router as apiRouter };