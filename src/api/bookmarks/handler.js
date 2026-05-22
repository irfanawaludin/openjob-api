class BookmarksHandler {

  constructor(service) {

    this._service = service;

    this.postBookmarkHandler =
      this.postBookmarkHandler.bind(this);

    this.getBookmarksHandler =
      this.getBookmarksHandler.bind(this);

    this.getBookmarkByIdHandler =
      this.getBookmarkByIdHandler.bind(this);

    this.deleteBookmarkHandler =
      this.deleteBookmarkHandler.bind(this);
  }

  async postBookmarkHandler(
    req,
    res
  ) {

    const user_id =
      req.auth.id;

    const { jobId } =
      req.params;

    const bookmarkId =
      await this._service.addBookmark({
        user_id,
        job_id: jobId,
      });

    return res.status(201).json({
      status: 'success',
      message: 'Bookmark berhasil dibuat',
      data: {
        bookmarkId,
      },
    });
  }

  async getBookmarksHandler(
    req,
    res
  ) {

    const userId =
      req.auth.id;

    const bookmarks =
      await this._service
        .getBookmarks(userId);

    return res.json({
      status: 'success',
      data: {
        bookmarks,
      },
    });
  }

  async getBookmarkByIdHandler(
    req,
    res
  ) {

    const { id } =
      req.params;

    const bookmark =
      await this._service
        .getBookmarkById(id);

    return res.json({
      status: 'success',
      data: {
        bookmark,
      },
    });
  }

  async deleteBookmarkHandler(
    req,
    res
  ) {

    const userId =
      req.auth.id;

    const { jobId } =
      req.params;

    await this._service
      .deleteBookmark(
        userId,
        jobId
      );

    return res.json({
      status: 'success',
      message: 'Bookmark berhasil dihapus',
    });
  }
}

module.exports =
  BookmarksHandler;