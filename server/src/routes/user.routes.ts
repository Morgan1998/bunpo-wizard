import { Router } from 'express';
import { createUser } from '../controllers/user.controller';
import { validate } from '../middleware/validate';
import { registerSchema } from '../validators/auth.validator';

const router = Router();

router.post('/', validate(registerSchema), createUser);

export default router;
