const express =
  require('express');

const CompaniesService =
  require('./service');

const CompaniesHandler =
  require('./handler');

const validate =
  require('../../middleware/validate');

const auth =
  require('../../middleware/auth');

const CompanyPayloadSchema =
  require('../../validator/companies/schema');

const router =
  express.Router();

const service =
  new CompaniesService();

const handler =
  new CompaniesHandler(service);

router.get(
  '/',
  handler.getCompaniesHandler
);

router.get(
  '/:id',
  handler.getCompanyByIdHandler
);

router.post(
  '/',
  auth,
  validate(CompanyPayloadSchema),
  handler.postCompanyHandler
);

router.put(
  '/:id',
  auth,
  validate(CompanyPayloadSchema),
  handler.putCompanyByIdHandler
);

router.delete(
  '/:id',
  auth,
  handler.deleteCompanyByIdHandler
);

module.exports = router;