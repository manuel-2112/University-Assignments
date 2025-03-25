/**
 * User validations schemas
 */

import Joi from 'joi';
import { ValidationSchema } from '@core/interfaces/validationSchema';
import { Role } from './role.enum';
import { Status } from './status.enum';
import { OwnershipStatus } from './ownershipStatus.enum';

/**
 * Validation schema for creating user
 */
export const createUserValidation: ValidationSchema = {
  body: Joi.object()
    .keys({
      user_id: Joi.string().required().empty(false),
    })
    .required(),
};

/**
 * Validation schema for creating potential user
 */
export const createPotentialUserValidation: ValidationSchema = {
  body: Joi.object()
    .keys({
      role: Joi.string()
        .valid(...Object.values(Role))
        .required(),
      displayData: Joi.object()
        .keys({
          name: Joi.string().required(),
          email: Joi.string().email().required(),
          number: Joi.string().required(),
          motivation: Joi.string(),
        })
        .required(),
    })
    .required(),
};

/**
 * Validation schema for updating display data
 */
export const updateUserDisplayDataValidation: ValidationSchema = {
  body: Joi.object()
    .keys({
      displayData: Joi.object()
        .keys({
          name: Joi.string().required(),
          email: Joi.string().email().required(),
          number: Joi.string().required(),
          motivation: Joi.string(),
        })
        .required(),
    })
    .required(),
};

/**
 * Validation schema updating status
 */
export const updateUserStatusValidation: ValidationSchema = {
  body: Joi.object()
    .keys({
      status: Joi.string()
        .valid(...Object.values(Status))
        .required(),
    })
    .required(),
};

export const updateOwnershipValidation: ValidationSchema = {
  body: Joi.object()
    .keys({
      user_id: Joi.string().required().empty(false),
      ownershipStatus: Joi.string()
        .valid(...Object.values(OwnershipStatus))
        .required(),
    })
    .required(),
};

export const priviligedUpdateOwnershipValidation: ValidationSchema = {
  body: Joi.object()
    .keys({
      ownershipStatus: Joi.string()
        .valid(...Object.values(OwnershipStatus))
        .required(),
    })
    .required(),
};
