const express =
  require('express');

const BookmarksService =
  require('./service');

const BookmarksHandler =
  require('./handler');

const auth =
  require('../../middleware/auth');

const router =
  express.Router();

const service =
  new BookmarksService();

const handler =
  new BookmarksHandler(service);

router.use(auth);

router.post(
  '/jobs/:jobId/bookmark',
  handler.postBookmarkHandler
);

router.get(
  '/bookmarks',
  handler.getBookmarksHandler
);

router.get(
  '/jobs/:jobId/bookmark/:id',
  handler.getBookmarkByIdHandler
);

router.delete(
  '/jobs/:jobId/bookmark',
  handler.deleteBookmarkHandler
);

module.exports = router;