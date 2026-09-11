import { Router } from 'express';
import { createToken, deleteToken } from '../controllers/tokens.controller';
import { validate } from '../middleware/validate';
import { loginSchema } from '../validators/auth.validator';

const router = Router();

router.post('/', validate(loginSchema), createToken);

router.delete('/', deleteToken);

export default router;
