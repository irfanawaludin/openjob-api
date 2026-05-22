const Joi = require('joi');

const ApplicationPayloadSchema =
  Joi.object({

    job_id:
      Joi.string().required(),

    status:
      Joi.string(),
  });

module.exports =
  ApplicationPayloadSchema;