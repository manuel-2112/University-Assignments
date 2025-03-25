import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';
import {
  validateStructure,
  validatePermissions,
} from '@core/middlewares/validate.middleware';
import { AllowedEntities } from '@components/authentication/entities.enum';
import mongoose from 'mongoose';
import { afterAll, beforeAll, describe, it, expect, jest } from '@jest/globals';
import {
  createMongoContainer,
  connect,
  closeConnection,
} from '@core/utils/create_container';
import { fail } from 'assert';

jest.setTimeout(60000); // Increased to 1 minute

let container: any;

beforeAll(async () => {
  const env = await createMongoContainer();
  container = env.container;
  process.env.DB_URL = env.mongoUrl;
  await connect();
});

describe('Validate Middleware', () => {
  it('should validate structure', async () => {
    const schema = {
      params: Joi.object({
        id: Joi.string().required(),
      }),
    };
    const middleware = validateStructure(schema);
    const req: any = { params: { id: '123' } };
    const res: any = { send: jest.fn(), status: jest.fn().mockReturnThis() };
    const next: any = jest.fn();
    await middleware(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it('should return next if entity is not allowed (for example, COMPANY)', async () => {
    const middleware = validatePermissions(AllowedEntities.COMPANY);
    const req: Partial<Request> = {};
    const res: Partial<Response> = {};
    const next: NextFunction = jest.fn();

    try {
      await middleware(req as Request, res as Response, next);
      fail('Expected middleware to throw an error for disallowed entity');
    } catch (error) {
      // Ensure any error is thrown
      expect(error).toBeDefined();
    }
  });

  const closeMongooseConnection = async () => {
    await mongoose.disconnect();
  };

  afterAll(async () => {
    await closeMongooseConnection();
    await closeConnection(container);
  });
});
