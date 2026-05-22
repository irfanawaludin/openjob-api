class ProfileHandler {
  constructor(service) {
    this._service = service;

    this.getProfileHandler =
      this.getProfileHandler.bind(this);

    this.getMyApplicationsHandler =
      this.getMyApplicationsHandler.bind(this);

      this.getMyBookmarksHandler =
  this.getMyBookmarksHandler.bind(this);
  }

  async getProfileHandler(req, res) {
    const { id } = req.auth;

    const profile =
      await this._service.getProfile(id);

    return res.json({
      status: 'success',
      data: {
        profile,
      },
    });
  }

  async getMyApplicationsHandler(
    req,
    res
  ) {

    const { id } =
      req.auth;

    const applications =
      await this._service
        .getMyApplications(id);

    return res.json({
      status: 'success',
      data: {
        applications,
      },
    });
  }

  async getMyBookmarksHandler(
  req,
  res
) {

  const { id } =
    req.auth;

  const bookmarks =
    await this._service
      .getMyBookmarks(id);

  return res.json({
    status: 'success',
    data: {
      bookmarks,
    },
  });
}
}

module.exports = ProfileHandler;