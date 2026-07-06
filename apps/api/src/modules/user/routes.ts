import { Router } from "express";
import { UserController } from "./controllers/UserController.js";

const router = Router();
const userController = new UserController();

//POST /api/v1/users
router.post(
    '/:organizationId/users',
    userController.createUser
);

//GET /api/v1/users/:userId
router.get(
    '/:organizationId/users/:userId',
    userController.getUser
);

//GET /api/v1/users
router.get(
    '/:organizationId/users',
    userController.listUsers
);

//PUT /api/v1/users/:userId
router.put(
    '/:organizationId/users/:userId',
    userController.updateUser
);

//DELETE /api/v1/users/:userId
router.delete(
    '/:organizationId/users/:userId',
    userController.deleteUser
);

export { router as userRouter };