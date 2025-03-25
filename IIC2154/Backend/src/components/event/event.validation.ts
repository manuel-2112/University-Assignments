/**
 * Event validation schemas
 */

import Joi from 'joi';
import { ValidationSchema } from '@core/interfaces/validationSchema';
import { EventType } from './type.enum';
import { EventStatus } from './status.enum';

/**
 * Validation schema for creating event
 */

export const createEventValidation: ValidationSchema = {
  body: Joi.object()
    .keys({
      name: Joi.string().required(),
      initialDate: Joi.date().required(),
      finalDate: Joi.date().required(),
      url: Joi.string().required(),
      type: Joi.string()
        .valid(...Object.values(EventType))
        .required(),
      status: Joi.string()
        .valid(...Object.values(EventStatus))
        .required(),
    })
    .required(),
};

/**
 * Validation schema for updating event
 */

export const updateEventValidation: ValidationSchema = {
  body: Joi.object()
    .keys({
      name: Joi.string().required(),
      initialDate: Joi.date().required(),
      finalDate: Joi.date().required(),
      url: Joi.string().required(),
      type: Joi.string()
        .valid(...Object.values(EventType))
        .required(),
      status: Joi.string()
        .valid(...Object.values(EventStatus))
        .required(),
    })
    .required(),
};

/**
 * Validation schema for updating event status
 */

export const updateEventStatusValidation: ValidationSchema = {
  body: Joi.object()
    .keys({
      status: Joi.string()
        .valid(...Object.values(EventStatus))
        .required(),
    })
    .required(),
};
