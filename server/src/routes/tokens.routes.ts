import { Router } from 'express';
import { validate } from '../middleware/validate';
import { loginSchema } from '../validators/auth.validator';

import * as TokensController from '../controllers/tokens.controller';

const router = Router();

router.post('/', validate(loginSchema), TokensController.createToken);

router.delete('/', TokensController.deleteToken);

export default router;
