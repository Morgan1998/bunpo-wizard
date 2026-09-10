import { Router } from 'express';
import { createUser, searchUsers } from '../controllers/user.controller';
import { validate } from '../middleware/validate';
import { registerSchema } from '../validators/auth.validator';
import { searchUserQuerySchema } from '../validators/user.validator';
import { authenticate } from '../middleware/authenticate';

const router = Router();

router.post('/', validate(registerSchema), createUser);

router.get(
  '/',
  authenticate,
  validate(searchUserQuerySchema, 'query'),
  searchUsers,
);

export default router;
