import { Request, Response, NextFunction } from 'express';
import apiKeyMiddleware from '@core/middlewares/apiKey.middleware';
import AppError from '@core/utils/appError';
import { describe, it, expect, jest } from '@jest/globals';
import { fail } from 'assert';
import config from '../../src/config/config';

describe('API Key Middleware', () => {
  it('should call next if x-api-key header matches environment variable', () => {
    const req: Partial<Request> = {
      headers: {
        'x-api-key': config.xApiKey,
      },
      header: jest.fn((name: string) => {
        if (name === 'x-api-key') {
          return config.xApiKey;
        }
        if (name === 'set-cookie') {
          return ['some-cookie-value'];
        }
        return undefined;
      }) as unknown as Request['header'],
    };
    const res: Partial<Response> = {};
    const next: NextFunction = jest.fn();

    try {
      apiKeyMiddleware(req as Request, res as Response, next);
      expect(next).toHaveBeenCalled();
    } catch (error) {
      // If apiKeyMiddleware throws an error, fail the test
      fail(error);
    }
  });

  it('should throw an error if x-api-key header is missing or does not match environment variable', () => {
    const req: Partial<Request> = {
      headers: {
        'x-api-key': 'invalidpassword', // Use an invalid API key here
      },
      header: jest.fn((name: string) => {
        if (name === 'x-api-key') {
          return 'invalidpassword';
        }
        if (name === 'set-cookie') {
          return ['some-cookie-value'];
        }
        return undefined;
      }) as unknown as Request['header'],
    };
    const res: Partial<Response> = {};
    const next: NextFunction = jest.fn();

    expect(() =>
      apiKeyMiddleware(req as Request, res as Response, next),
    ).toThrow(AppError);
    expect(next).not.toHaveBeenCalled(); // Ensure next is not called when API key is invalid
  });
});
