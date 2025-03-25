/**
 * This module contains validations schemas for news
 */

import Joi from 'joi';
import { ValidationSchema } from '@core/interfaces/validationSchema';

/**
 * Validation schema for creating a news
 */
export const createNewsValidation: ValidationSchema = {
  body: Joi.object()
    .keys({
      title: Joi.string().required().empty(false),
      additionalInfo: Joi.string().required().empty(false),
      // imageLink: Joi.string().empty(false),
    })
    .required(),
};

/**
 * Validation schema for updating a news
 */
export const updateNewsValidation: ValidationSchema = {
  body: Joi.object()
    .keys({
      title: Joi.string().empty(false),
      additionalInfo: Joi.string().empty(false),
      imageLink: Joi.string().empty(false),
      isVisible: Joi.boolean(),
    })
    .or('title', 'additionalInfo', 'imageLink', 'isVisible')
    .required(),
};
