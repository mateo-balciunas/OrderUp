import { Router } from "express";
import { UserController } from "./controllers/UserController.ts";

const router = Router();
const userController = new UserController();

//POST /api/v1/users
router.post(
    '/api/v1/users',
    userController.createUser
);

//GET /api/v1/users/:userId
router.get(
    '/users/:userId',
    userController.getUser
);

//GET /api/v1/users
router.get(
    '/users',
    userController.listUsers
);

//PUT /api/v1/users/:userId
router.put(
    '/users/:userId',
    userController.updateUser
);

//DELETE /api/v1/users/:userId
router.delete(
    '/users/:userId',
    userController.deleteUser
);

export { router as userRouter };