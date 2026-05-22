const express =
  require('express');

const DocumentsService =
  require('./service');

const DocumentsHandler =
  require('./handler');

const auth =
  require('../../middleware/auth');

const upload =
  require('../../middleware/upload');

const router =
  express.Router();

const service =
  new DocumentsService();

const handler =
  new DocumentsHandler(service);

router.get(
  '/',
  handler.getDocumentsHandler
);

router.get(
  '/:id',
  handler.getDocumentByIdHandler
);

router.post(
  '/',
  auth,
  upload.single('document'),
  handler.postDocumentHandler
);

router.delete(
  '/:id',
  auth,
  handler.deleteDocumentByIdHandler
);

module.exports =
  router;