const express = require('express');

const UsersService = require('./service');
const UsersHandler = require('./handler');

const validate = require('../../middleware/validate');
const UserPayloadSchema = require('../../validator/users/schema');

const router = express.Router();

const service = new UsersService();
const handler = new UsersHandler(service);

router.post(
  '/',
  validate(UserPayloadSchema),
  handler.postUserHandler
);

router.get('/:id', handler.getUserByIdHandler);

module.exports = router;