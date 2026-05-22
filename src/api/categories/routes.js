const express =
  require('express');

const CategoriesService =
  require('./service');

const CategoriesHandler =
  require('./handler');

const validate =
  require('../../middleware/validate');

const auth =
  require('../../middleware/auth');

const CategoryPayloadSchema =
  require('../../validator/categories/schema');

const router =
  express.Router();

const service =
  new CategoriesService();

const handler =
  new CategoriesHandler(service);

router.get(
  '/',
  handler.getCategoriesHandler
);

router.get(
  '/:id',
  handler.getCategoryByIdHandler
);

router.post(
  '/',
  auth,
  validate(CategoryPayloadSchema),
  handler.postCategoryHandler
);

router.put(
  '/:id',
  auth,
  validate(CategoryPayloadSchema),
  handler.putCategoryByIdHandler
);

router.delete(
  '/:id',
  auth,
  handler.deleteCategoryByIdHandler
);

module.exports = router;