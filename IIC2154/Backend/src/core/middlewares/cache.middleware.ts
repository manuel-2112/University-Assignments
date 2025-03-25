import { Request, Response } from 'express';
import md5 from 'md5';

/**
 * The header name used to control API caching behavior.
 */
export const API_CACHE_HAEDER: string = 'apicache-control';

/**
 * Middleware function to filter responses with status code 200 only.
 * @param {Request} req - request object.
 * @param {Response} res - response object.
 * @returns {boolean} True if the response status code is 200 and caching is not explicitly disabled; otherwise, false.
 */
export const onlyStatus200 = (req: Request, res: Response) => {
  if (req.headers['apicache-control'] === 'no-cache') return false;
  return res.statusCode === 200;
};

/**
 * Middleware function to generate a unique cache key based on request method and body (if applicable).
 * @param {Request} req - request object.
 * @returns {string} A unique cache key derived from the request method and body (if applicable).
 */
export const onlyWithUniqueBody = (req: Request) => {
  if (req.method === 'POST' && req.body) {
    return md5(JSON.stringify(req.body));
  }
  return req.path;
};
