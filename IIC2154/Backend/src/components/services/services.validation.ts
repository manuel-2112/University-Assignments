/**
 * This module contains validations schemas for services
 */

import Joi from 'joi';
import { ValidationSchema } from '@core/interfaces/validationSchema';

/**
 * Validation schema for creating a service
 */
export const createServiceValidation: ValidationSchema = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.string().required(),
    category: Joi.array().items(Joi.string()).min(1).required(),
  }),
};

/**
 * Validation schema for updating a service
 */
export const updateServiceValidation: ValidationSchema = {
  body: Joi.object()
    .keys({
      name: Joi.string().required(),
      description: Joi.string().required(),
      imageLink: Joi.array().items(Joi.string()).required(),
      price: Joi.string(),
      category: Joi.array()
        .items(
          Joi.string().valid('IoT', 'Maquinaria', 'Gestión de Agua', 'Suelo'),
        )
        .min(1)
        .required(),
    })
    .required(),
};
