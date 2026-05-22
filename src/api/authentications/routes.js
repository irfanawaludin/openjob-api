const express =
  require('express');

const AuthenticationsService =
  require('./service');

const AuthenticationsHandler =
  require('./handler');

const validate =
  require('../../middleware/validate');

const {
  AuthenticationPayloadSchema,
  RefreshTokenSchema,
} = require(
  '../../validator/authentications/schema'
);

const router =
  express.Router();

const service =
  new AuthenticationsService();

const handler =
  new AuthenticationsHandler(service);

router.post(
  '/',
  validate(
    AuthenticationPayloadSchema
  ),
  handler.postAuthenticationHandler
);

router.put(
  '/',
  validate(
    RefreshTokenSchema
  ),
  handler.putAuthenticationHandler
);

router.delete(
  '/',
  handler.deleteAuthenticationHandler
);

module.exports =
  router;