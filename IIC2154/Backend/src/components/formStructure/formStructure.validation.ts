/**
 * Validation schema for creating a form structure.
 */

import Joi from 'joi';
import { ValidationSchema } from '@core/interfaces/validationSchema';

/**
 * Validation schema for creating a form structure.
 */
export const createFormStructureValidation: ValidationSchema = {
  body: Joi.object()
    .keys({
      name: Joi.boolean().required(),
      email: Joi.boolean().required(),
      phone: Joi.boolean().required(),
      service: Joi.boolean().required(),
      text: Joi.boolean().required(),
    })
    .required(),
};

/**
 * Validation schema for editing form structure.
 */
export const editFormStructureValidation: ValidationSchema = {
  body: Joi.object()
    .keys({
      name: Joi.boolean(),
      email: Joi.boolean(),
      phone: Joi.boolean(),
      service: Joi.boolean(),
      text: Joi.boolean(),
    })
    .required(),
};
