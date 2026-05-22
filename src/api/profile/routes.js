const express = require('express');

const ProfileService =
  require('./service');

const ProfileHandler =
  require('./handler');

const auth =
  require('../../middleware/auth');

const router = express.Router();

const service =
  new ProfileService();

const handler =
  new ProfileHandler(service);

router.get(
  '/',
  auth,
  handler.getProfileHandler
)
router.get(
  '/applications',
  auth,
  handler.getMyApplicationsHandler
)
router.get(
  '/bookmarks',
  auth,
  handler.getMyBookmarksHandler
);


module.exports = router;