import { Request, Response, NextFunction } from 'express';
import AppError from '@core/utils/appError';
import httpStatus from 'http-status';

/* eslint-disable consistent-return */
export const isValidRequestFormat = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let errorMessage;
  if (!req.is('multipart/form-data')) {
    errorMessage = 'The request must be of type multipart/form-data.';
    return next(new AppError(httpStatus.BAD_REQUEST, errorMessage));
  }
  if (!req.file) {
    errorMessage = "An image was not provided in the 'image' field.";
    return next(new AppError(httpStatus.BAD_REQUEST, errorMessage));
  }
  next();
};
/* eslint-enable consistent-return */
