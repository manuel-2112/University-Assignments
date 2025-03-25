import { Router } from 'express';
import { search, searchCompanies, searchServices } from './search.controller';

const router: Router = Router();
router.get('/search', search);
router.get('/search/companies', searchCompanies);
router.get('/search/services', searchServices);

export default router;
