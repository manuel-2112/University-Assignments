import Joi from 'joi';
import httpStatus from 'http-status';
import { NextFunction, Request, Response } from 'express';

import AppError from '@core/utils/appError';
import { ValidationSchema } from '@core/interfaces/validationSchema';
import { AllowedEntities as allowedEntities } from '@components/authentication/entities.enum';
import { jwtCheckAdmin } from '@components/authentication/auth.admin';
import { jwtCheckCompany } from '@components/authentication/auth.company';
// import { UnauthorizedError } from 'express-jwt';

/**
 * Middleware function to validate request data structure against a provided schema.
 * Throws an error if validation fails.
 * @param {ValidationSchema} schema - The validation schema to validate against.
 */
export const validateStructure =
  (schema: ValidationSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    /* eslint-disable */
    const pickObjectKeysWithValue = (Object: object, Keys: string[]) =>
      Keys.reduce((o, k) => ((o[k] = Object[k]), o), {});
    /* eslint-enable */
    const definedSchemaKeys = Object.keys(schema);
    const acceptableSchemaKeys: string[] = ['params', 'query', 'body'];
    const filterOutNotValidSchemaKeys: string[] = Object.keys(schema).filter(
      (k) => acceptableSchemaKeys.includes(k),
    );
    if (filterOutNotValidSchemaKeys.length !== definedSchemaKeys.length) {
      const e = `Wrongly defined validation Schema keys: [${definedSchemaKeys}], allowed keys: [${acceptableSchemaKeys}]`;
      throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, e, false);
    }
    const validSchema = pickObjectKeysWithValue(
      schema,
      filterOutNotValidSchemaKeys,
    );
    const object = pickObjectKeysWithValue(req, Object.keys(validSchema));
    const { value, error } = Joi.compile(validSchema)
      .prefs({ errors: { label: 'key' } })
      .validate(object);

    if (error) {
      const errorMessage = error.details
        .map((details) => details.message)
        .join(', ');
      return next(new AppError(httpStatus.BAD_REQUEST, errorMessage));
    }
    Object.assign(req, value);
    return next();
  };

/**
 * Middleware function to validate permissions based on the entity allowed.
 * Throws an error if the entity is not allowed.
 * @param {string} entityAllowed - The entity for which permissions are being validated (ADMIN or COMPANY)
 */
export const validatePermissions =
  (entityAllowed: string) =>
  (req: Request, res: Response, next: NextFunction) => {
    const throwError = () => {
      const errorMessage = 'Entity not allowed';
      return next(new AppError(httpStatus.FORBIDDEN, errorMessage));
    };
    switch (entityAllowed) {
      case allowedEntities.COMPANY:
        jwtCheckCompany(req, res, next);
        break;
      case allowedEntities.ADMIN:
        jwtCheckAdmin(req, res, next);
        break;
      default:
        throwError();
    }
  };
