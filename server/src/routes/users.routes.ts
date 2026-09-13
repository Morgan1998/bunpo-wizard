import { Router } from 'express';
import { authenticate } from '../middleware/authenticate';
import { validate } from '../middleware/validate';

import * as AuthValidator from '../validators/auth.validator';
import * as UsersValidator from '../validators/users.validator';
import * as UsersController from '../controllers/users.controller';

const router = Router();

router.post(
  '/',
  validate(AuthValidator.registerSchema),
  UsersController.createUser,
);

router.use(authenticate);

router.get(
  '/',
  validate(UsersValidator.searchUserQuerySchema, 'query'),
  UsersController.searchUsers,
);

export default router;
