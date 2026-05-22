class CategoriesHandler {

  constructor(service) {
    this._service = service;

    this.postCategoryHandler =
      this.postCategoryHandler.bind(this);

    this.getCategoriesHandler =
      this.getCategoriesHandler.bind(this);

    this.getCategoryByIdHandler =
      this.getCategoryByIdHandler.bind(this);

    this.putCategoryByIdHandler =
      this.putCategoryByIdHandler.bind(this);

    this.deleteCategoryByIdHandler =
      this.deleteCategoryByIdHandler.bind(this);
  }

  async postCategoryHandler(req, res) {
    const categoryId =
      await this._service.addCategory(
        req.body
      );

    return res.status(201).json({
      status: 'success',
      message: 'Category berhasil dibuat',
      data: {
        categoryId,
      },
    });
  }

  async getCategoriesHandler(req, res) {
    const categories =
      await this._service.getCategories();

    return res.json({
      status: 'success',
      data: {
        categories,
      },
    });
  }

  async getCategoryByIdHandler(req, res) {
    const { id } = req.params;

    const category =
      await this._service.getCategoryById(id);

    return res.json({
      status: 'success',
      data: {
        category,
      },
    });
  }

  async putCategoryByIdHandler(req, res) {
    const { id } = req.params;

    await this._service.editCategoryById(
      id,
      req.body
    );

    return res.json({
      status: 'success',
      message: 'Category berhasil diupdate',
    });
  }

  async deleteCategoryByIdHandler(req, res) {
    const { id } = req.params;

    await this._service.deleteCategoryById(id);

    return res.json({
      status: 'success',
      message: 'Category berhasil dihapus',
    });
  }
}

module.exports =
  CategoriesHandler;