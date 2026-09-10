import { Router } from 'express';
import { login, logout } from '../controllers/token.controller';
import { validate } from '../middleware/validate';
import { loginSchema } from '../validators/auth.validator';

const router = Router();

router.post('/', validate(loginSchema), login);

router.delete('/', logout);

export default router;
