import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import config from '@config/config';
import AppError from '@core/utils/appError';
import logger from '@core/utils/logger';

/**
 * Will check if x-api-key inside request header matches env variable
 * @param req - request object
 * @param res - response object
 * @param next - next function
 * @returns Next Function
 * @throws If x-api-key is not contained in header, or it doesn't match env
 */
const apiKey = (req: Request, res: Response, next: NextFunction) => {
  let xApiKey: string;
  const token: string = config.xApiKey;
  if (req.header('x-api-key')) {
    xApiKey = req.header('x-api-key').trim();
  }
  if (!!token && xApiKey === token.trim()) {
    return next();
  }
  logger.error(
    'Missing x-api-key in request header or it does not match with env variable',
  );
  throw new AppError(httpStatus.UNAUTHORIZED, 'Access forbidden');
};

export default apiKey;
