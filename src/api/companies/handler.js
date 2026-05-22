class CompaniesHandler {

  constructor(service) {
    this._service = service;

    this.postCompanyHandler =
      this.postCompanyHandler.bind(this);

    this.getCompaniesHandler =
      this.getCompaniesHandler.bind(this);

    this.getCompanyByIdHandler =
      this.getCompanyByIdHandler.bind(this);

    this.putCompanyByIdHandler =
      this.putCompanyByIdHandler.bind(this);

    this.deleteCompanyByIdHandler =
      this.deleteCompanyByIdHandler.bind(this);
  }

  async postCompanyHandler(req, res) {

    const ownerId =
      req.auth.id;

    const companyId =
      await this._service.addCompany({
        ...req.body,
        ownerId,
      });

    return res.status(201).json({
      status: 'success',
      message: 'Company berhasil dibuat',
      data: {
        companyId,
      },
    });
  }

  async getCompaniesHandler(req, res) {

    const companies =
      await this._service.getCompanies();

    return res.json({
      status: 'success',
      data: {
        companies,
      },
    });
  }

  async getCompanyByIdHandler(req, res) {

    const { id } = req.params;

    const company =
      await this._service.getCompanyById(id);

    return res.json({
      status: 'success',
      data: {
        company,
      },
    });
  }

  async putCompanyByIdHandler(req, res) {

    const { id } = req.params;

    await this._service.editCompanyById(
      id,
      req.body
    );

    return res.json({
      status: 'success',
      message: 'Company berhasil diupdate',
    });
  }

  async deleteCompanyByIdHandler(req, res) {

    const { id } = req.params;

    await this._service.deleteCompanyById(id);

    return res.json({
      status: 'success',
      message: 'Company berhasil dihapus',
    });
  }
}

module.exports =
  CompaniesHandler;