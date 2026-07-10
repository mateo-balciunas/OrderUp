import { Router } from 'express';
import { AuthController } from './controllers/AuthController.js';
import { loginSchema, registerUserSchema } from './schemas.js';
import { validate } from '../../middleware/validation.middleware.js';
import { authenticate } from '../../middleware/auth.middleware.js';

const router = Router();
const authController = new AuthController();

//POST /api/v1/auth/login
router.post(
    '/login',
    validate(loginSchema),
    authController.login
);

//GET /api/v1/auth/current-user
router.get(
    '/current-user',
    authenticate,
    authController.getCurrentUser
);

//POST /api/v1/auth/register
router.post(
    '/register',
    validate(registerUserSchema),
    authController.register
)

export { router as authRoutes };