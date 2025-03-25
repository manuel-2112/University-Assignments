/**
 * Validation schema for creating form data.
 */

import Joi from 'joi';
import { ValidationSchema } from '@core/interfaces/validationSchema';

/**
 * Validation schema for creating form data.
 */
export const createFormDataValidation: ValidationSchema = {
  body: Joi.object()
    .keys({
      name: Joi.string(),
      email: Joi.string(),
      phone: Joi.string(),
      service: Joi.string(),
      text: Joi.string(),
    })
    .required(),
};
