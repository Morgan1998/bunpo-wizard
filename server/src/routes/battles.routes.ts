import { Router } from 'express';
import { authenticate } from '../middleware/authenticate';
import { validate } from '../middleware/validate';
import { createBattleInputSchema } from '../validators/battles.validator';
import { createBattle } from '../controllers/battles.controller';
import { getBattles } from '../controllers/battles.controller';

const router = Router();

router.use(authenticate);

router.post('/', validate(createBattleInputSchema), createBattle);

router.get('/', getBattles);

export default router;
