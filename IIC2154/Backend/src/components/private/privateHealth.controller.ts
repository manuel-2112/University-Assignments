import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { unauthorizedCompany } from '@components/authentication/auth.company';

const privateHealth = (req: Request, res: Response) => {
  unauthorizedCompany(req, res);
  res.status(httpStatus.OK);
  res.send({
    status: 'OK You are on a private route',
    data: new Date().toJSON(),
  });
};
export default privateHealth;
