/**
 * Middleware function to check the validity of a JSON Web Token (JWT) for admin authentication.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {void}
 */
import jwksRsa from 'jwks-rsa';
import { expressjwt, GetVerificationKey } from 'express-jwt';
import request from 'request';
import config from '../../config/config';

/**
 * Variable to get the JSON Web Key Set (JWKS) URI.
 */
export const jwtCheckAdmin = expressjwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: config.jwksUri,
  }) as GetVerificationKey,
  audience: config.audienceAdmin,
  issuer: config.issuer,
  algorithms: [config.algorithms],
});

/* eslint-disable-next-line */
export function unauthorizedAdmin(req, res) {
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
