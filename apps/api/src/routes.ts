import { Router } from "express";
import { userRouter } from "./modules/user/routes.js";
import { organizationRouter } from "./modules/organization/routes.js";
import { orderRouter } from "./modules/order/routes.js";
import { membershipRouter } from "./modules/membership/routes.js";
import { channelConnectionRouter } from "./modules/channelConnection/routes.js";
import { authRoutes } from "./modules/auth/routes.js";
import { authenticate } from "./middleware/auth.middleware.js";

const router = Router();

router.use('/auth', authRoutes);

router.use(authenticate, userRouter);
router.use(authenticate, organizationRouter);
router.use(authenticate,orderRouter);
router.use(authenticate, membershipRouter);
router.use(authenticate, channelConnectionRouter);

export { router as apiRouter };