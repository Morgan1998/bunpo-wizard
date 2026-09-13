import { Router } from 'express';
import { authenticate } from '../middleware/authenticate';
import { validate } from '../middleware/validate';

import * as BattlesValidator from '../validators/battles.validator';
import * as BattlesController from '../controllers/battles.controller';

const router = Router();

router.use(authenticate);

router.post(
  '/',
  validate(BattlesValidator.createBattleInputSchema),
  BattlesController.createBattle,
);

router.get('/', BattlesController.getBattles);

router.patch(
  '/:battleId',
  validate(BattlesValidator.updateBattleInputParamsSchema, 'params'),
  validate(BattlesValidator.updateBattleInputBodySchema, 'body'),
  BattlesController.updateBattle,
);

export default router;
