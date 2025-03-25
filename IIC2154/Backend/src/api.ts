import express, { Router } from 'express';
import healthCheck from '@components/healthcheck/healthCheck.router';
import company from '@components/company/company.router';
import news from '@components/news/news.router';
import privateHealth from '@components/private/privateHealth.router';
import cors from 'cors';
import search from '@components/search/search.router';
import imagesUpload from '@components/imagesUpload/imagesUpload.router';
import event from '@components/event/event.router';
import user from '@components/user/user.router';

const router: Router = Router();
router.use(cors());
router.use(express.json());
router.use(healthCheck);
router.use(privateHealth);
router.use(company);
router.use(news);
router.use(event);
router.use(search);
router.use(imagesUpload);
router.use(user);

export default router;
