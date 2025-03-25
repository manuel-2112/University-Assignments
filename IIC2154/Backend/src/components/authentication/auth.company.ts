/**
 * Middleware function to validate permissions based on the entity allowed.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function.
 * @returns - Returns the next middleware function or throws an error.
 * @throws If unauthorized - Throws an error if the request is unauthorized.
 * @throws If internal server error - Throws an error if there is an internal server error.
 * @throws If entity not allowed - Throws an error if the entity is not allowed.
 */
import jwksRsa from 'jwks-rsa';
import { expressjwt, GetVerificationKey } from 'express-jwt';
import request from 'request';
import config from '../../config/config';

export const jwtCheckCompany = expressjwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: config.jwksUri,
  }) as GetVerificationKey,
  audience: [config.audience, config.audienceAdmin],
  issuer: config.issuer,
  algorithms: [config.algorithms],
});

/**
 * Middleware function to validate permissions based on the entity allowed.
 * @param req - The request object.
 * @param res - The response object.
 */
/* eslint-disable-next-line */
export function unauthorizedCompany(req, res) {
  const options = {
    method: 'POST',
    url: config.url,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      client_id: config.clientId,
      client_secret: config.clientSecret,
      audience: config.audienceAuth0,
      grant_type: config.grantType,
    }),
  };
  /* eslint-disable-next-line */
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
  });
}
