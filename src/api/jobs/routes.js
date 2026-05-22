const express =
  require('express');

const JobsService =
  require('./service');

const JobsHandler =
  require('./handler');

const validate =
  require('../../middleware/validate');

const auth =
  require('../../middleware/auth');

const JobPayloadSchema =
  require('../../validator/jobs/schema');

const router =
  express.Router();

const service =
  new JobsService();

const handler =
  new JobsHandler(service);

router.get(
  '/',
  handler.getJobsHandler
);

router.get(
  '/:id',
  handler.getJobByIdHandler
);

router.get(
  '/company/:companyId',
  handler.getJobsByCompanyHandler
);

router.get(
  '/category/:categoryId',
  handler.getJobsByCategoryHandler
);

router.post(
  '/',
  auth,
  validate(JobPayloadSchema),
  handler.postJobHandler
);

router.put(
  '/:id',
  auth,
  validate(JobPayloadSchema),
  handler.putJobByIdHandler
);

router.delete(
  '/:id',
  auth,
  handler.deleteJobByIdHandler
);

module.exports = router;