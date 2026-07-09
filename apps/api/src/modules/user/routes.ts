import { Router } from "express";
import { UserController } from "./controllers/UserController.js";
import { validate } from "../../middleware/validation.middleware.ts";
import {
    createUserSchema,
    getUserSchema,
    listUsersSchema,
    updateUserSchema,
    deleteUserSchema
} from "./schemas.js";

const router = Router();
const userController = new UserController();

//POST /api/v1/users
router.post(
    '/:organizationId/users',
    validate(createUserSchema),
    userController.createUser
);

//GET /api/v1/users/:userId
router.get(
    '/:organizationId/users/:userId',
    validate(getUserSchema),
    userController.getUser
);

//GET /api/v1/users
router.get(
    '/:organizationId/users',
    validate(listUsersSchema),
    userController.listUsers
);

//PUT /api/v1/users/:userId
router.put(
    '/:organizationId/users/:userId',
    validate(updateUserSchema),
    userController.updateUser
);

//DELETE /api/v1/users/:userId
router.delete(
    '/:organizationId/users/:userId',
    validate(deleteUserSchema),
    userController.deleteUser
);

export { router as userRouter };