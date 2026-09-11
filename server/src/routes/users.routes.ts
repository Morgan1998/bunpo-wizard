import { Router } from 'express';
import { createUser, searchUsers } from '../controllers/users.controller';
import { validate } from '../middleware/validate';
import { registerSchema } from '../validators/auth.validator';
import { searchUserQuerySchema } from '../validators/users.validator';
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
