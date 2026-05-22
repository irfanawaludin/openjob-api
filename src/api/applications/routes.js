const express =
  require('express');

const ApplicationsService =
  require('./service');

const ApplicationsHandler =
  require('./handler');

const validate =
  require('../../middleware/validate');

const auth =
  require('../../middleware/auth');

const ApplicationPayloadSchema =
  require('../../validator/applications/schema');

const router =
  express.Router();

const service =
  new ApplicationsService();

const handler =
  new ApplicationsHandler(service);

router.use(auth);

router.post(
  '/',
  validate(ApplicationPayloadSchema),
  handler.postApplicationHandler
);

router.get(
  '/',
  handler.getApplicationsHandler
);

router.get(
  '/:id',
  handler.getApplicationByIdHandler
);

router.get(
  '/user/:userId',
  handler.getApplicationsByUserHandler
);

router.get(
  '/job/:jobId',
  handler.getApplicationsByJobHandler
);

router.put(
  '/:id',
  handler.putApplicationByIdHandler
);

router.delete(
  '/:id',
  handler.deleteApplicationByIdHandler
);

module.exports = router;