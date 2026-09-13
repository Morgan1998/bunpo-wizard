import { Router } from 'express';
import { authenticate } from '../middleware/authenticate';
import { validate } from '../middleware/validate';

import {
  createBattleInputSchema,
  updateBattleInputBodySchema,
  updateBattleInputParamsSchema,
} from '../validators/battles.validator';
import * as BattlesController from '../controllers/battles.controller';

const router = Router();

router.use(authenticate);

router.post(
  '/',
  validate(createBattleInputSchema),
  BattlesController.createBattle,
);

router.get('/', BattlesController.getBattles);

router.patch(
  '/:battleId',
  validate(updateBattleInputParamsSchema, 'params'),
  validate(updateBattleInputBodySchema, 'body'),
  BattlesController.updateBattle,
);

export default router;
