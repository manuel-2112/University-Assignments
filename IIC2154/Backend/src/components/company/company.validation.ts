/**
 * This module contains the validation schemas for the company entity,
 * or in other words, the schemas that define the structure of the request body for each endpoint.
 */

import Joi from 'joi';
import { ValidationSchema } from '@core/interfaces/validationSchema';

/**
 * Validation schema for creating a company
 * @const {ValidationSchema}
 * @public
 */
export const createCompanyValidation: ValidationSchema = {
  body: Joi.object()
    .keys({
      name: Joi.string(), // Ojo que puede llegar a ser required
      email: Joi.string().email().required(),
      rut: Joi.string(),
      // logo: Joi.string(),
      address: Joi.string(),
      city: Joi.string(),
      region: Joi.string(),
      description: Joi.string(),
      contactEmail: Joi.string(),
      contactPhone: Joi.string(),
      instagramUrl: Joi.string(),
      linkedinUrl: Joi.string(),
      webpageUrl: Joi.string(),
    })
    .required(),
};

/**
 * Validation schema for logging in a company
 * @const {ValidationSchema}
 * @public
 */
export const loginCompanyValidation: ValidationSchema = {
  body: Joi.object()
    .keys({
      name: Joi.string(), // Ojo que puede llegar a ser required
      email: Joi.string().email().required(),
    })
    .required(),
};

/**
 * Validation schema for updating a company
 * @const {ValidationSchema}
 * @public
 */
export const priviligedUpdateCompanyValidation: ValidationSchema = {
  body: Joi.object()
    .keys({
      name: Joi.string(),
      email: Joi.string().email(),
      rut: Joi.string(),
      logo: Joi.string(),
      address: Joi.string(),
      city: Joi.string(),
      region: Joi.string(),
      description: Joi.string(),
      contactEmail: Joi.string(),
      contactPhone: Joi.string(),
      instagramUrl: Joi.string(),
      linkedinUrl: Joi.string(),
      webpageUrl: Joi.string(),
      branchRegions: Joi.array().items(Joi.string()),
    })
    .required(),
};

export const updateCompanyValidation: ValidationSchema = {
  body: Joi.object()
    .keys({
      user_id: Joi.string().required().empty(false),
      companyData: Joi.object()
        .keys({
          name: Joi.string(),
          email: Joi.string().email(),
          rut: Joi.string(),
          logo: Joi.string(),
          address: Joi.string(),
          city: Joi.string(),
          region: Joi.string(),
          description: Joi.string(),
          contactEmail: Joi.string(),
          contactPhone: Joi.string(),
          instagramUrl: Joi.string(),
          linkedinUrl: Joi.string(),
          webpageUrl: Joi.string(),
          branchRegions: Joi.array().items(Joi.string()),
        })
        .required(),
    })
    .required(),
};

/**
 * Validation schema for verifying a company
 * @const {ValidationSchema}
 * @public
 */
export const verifyCompanyValidation: ValidationSchema = {
  body: Joi.object()
    .keys({
      isVerified: Joi.boolean().required(),
    })
    .required(),
};
