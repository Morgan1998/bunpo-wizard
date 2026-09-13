import { Router } from 'express';
import * as TokensController from '../controllers/tokens.controller';
import { validate } from '../middleware/validate';
import { loginSchema } from '../validators/auth.validator';

const router = Router();

router.post('/', validate(loginSchema), TokensController.createToken);

router.delete('/', TokensController.deleteToken);

export default router;
