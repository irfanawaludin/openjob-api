const Joi = require('joi');

const UserPayloadSchema = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = UserPayloadSchema;