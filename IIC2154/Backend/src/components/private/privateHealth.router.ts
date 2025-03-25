import { Router } from 'express';

import { jwtCheckCompany } from '@components/authentication/auth.company';
import privateHealth from './privateHealth.controller';

const router: Router = Router();

router.get('/privateHealth', jwtCheckCompany, privateHealth);

export default router;
