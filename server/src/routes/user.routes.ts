import { Router } from 'express';
import { register } from '../controllers/user.controller';
import { validate } from '../middleware/validate';
import { registerSchema } from '../validators/auth.validator';

const router = Router();

router.post('/', validate(registerSchema), register);

export default router;
