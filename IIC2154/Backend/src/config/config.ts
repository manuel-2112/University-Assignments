import Joi from 'joi';

const envsSchema = Joi.object()
  .keys({
    // Define here all env variables used by the app
    NODE_ENV: Joi.string()
      .valid('production', 'integration', 'development', 'test')
      .required(),
    PORT: Joi.required(),
    API_KEY_TOKEN: Joi.string().required(),
    MONGODB_URI: Joi.string().required(),
    JWKS_URI: Joi.string().required(),
    AUDIENCE: Joi.string().required(),
    ISSUER: Joi.string().required(),
    ALGORITHMS: Joi.string().required(),
    AUTH0_URL: Joi.string().required(),
    AUTH0_CLIENT_ID: Joi.string().required(),
    AUTH0_CLIENT_SECRET: Joi.string().required(),
    AUTH0_AUDIENCE: Joi.string().required(),
    AUTH0_GRANT_TYPE: Joi.string().required(),
    AUDIENCE_ADMIN: Joi.string().required(),
    MAIL_USER: Joi.string().required(),
    MAIL_TOKEN: Joi.string().required(),
    AWS_S3_ACCESS_KEY_ID: Joi.string().required(),
    AWS_S3_SECRET_ACCESS_KEY: Joi.string().required(),
    DEFAULT_COMPANY_LOGO: Joi.string().required(),
  })
  .unknown(true);

const { value: envVars, error } = envsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error) {
  throw new Error(
    `Config validation error: ${error.message}. \n
     This app requires env variables to work properly`,
  );
}

// Remember to export here all env variables used by the app
export default {
  env: envVars.NODE_ENV,
  port: parseInt(envVars.PORT, 10),
  xApiKey: envVars.API_KEY_TOKEN,
  mongoUrl: envVars.MONGODB_URI,
  jwksUri: envVars.JWKS_URI,
  audience: envVars.AUDIENCE,
  issuer: envVars.ISSUER,
  algorithms: envVars.ALGORITHMS,
  url: envVars.AUTH0_URL,
  clientId: envVars.AUTH0_CLIENT_ID,
  clientSecret: envVars.AUTH0_CLIENT_SECRET,
  audienceAuth0: envVars.AUTH0_AUDIENCE,
  grantType: envVars.AUTH0_GRANT_TYPE,
  audienceAdmin: envVars.AUDIENCE_ADMIN,
  mailUser: envVars.MAIL_USER,
  mailToken: envVars.MAIL_TOKEN,
  s3_access_key_id: envVars.AWS_S3_ACCESS_KEY_ID,
  s3_secret_access_key: envVars.AWS_S3_SECRET_ACCESS_KEY,
  default_company_logo: envVars.DEFAULT_COMPANY_LOGO,
};
