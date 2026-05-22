class JobsHandler {

  constructor(service) {
    this._service = service;

    this.postJobHandler =
      this.postJobHandler.bind(this);

    this.getJobsHandler =
      this.getJobsHandler.bind(this);

    this.getJobByIdHandler =
      this.getJobByIdHandler.bind(this);

    this.getJobsByCompanyHandler =
      this.getJobsByCompanyHandler.bind(this);

    this.getJobsByCategoryHandler =
      this.getJobsByCategoryHandler.bind(this);

    this.putJobByIdHandler =
      this.putJobByIdHandler.bind(this);

    this.deleteJobByIdHandler =
      this.deleteJobByIdHandler.bind(this);
  }

  async postJobHandler(req, res) {

    const jobId =
      await this._service.addJob(
        req.body
      );

    return res.status(201).json({
      status: 'success',
      message: 'Job berhasil dibuat',
      data: {
        jobId,
      },
    });
  }

  async getJobsHandler(req, res) {

    const jobs =
      await this._service.getJobs({
        title: req.query.title,

        companyName:
          req.query['company-name'],
      });

    return res.json({
      status: 'success',
      data: {
        jobs,
      },
    });
  }

  async getJobByIdHandler(req, res) {

    const { id } = req.params;

    const job =
      await this._service.getJobById(id);

    return res.json({
      status: 'success',
      data: {
        job,
      },
    });
  }

  async getJobsByCompanyHandler(
    req,
    res
  ) {

    const { companyId } =
      req.params;

    const jobs =
      await this._service
        .getJobsByCompany(companyId);

    return res.json({
      status: 'success',
      data: {
        jobs,
      },
    });
  }

  async getJobsByCategoryHandler(
    req,
    res
  ) {

    const { categoryId } =
      req.params;

    const jobs =
      await this._service
        .getJobsByCategory(categoryId);

    return res.json({
      status: 'success',
      data: {
        jobs,
      },
    });
  }

  async putJobByIdHandler(req, res) {

    const { id } = req.params;

    await this._service.editJobById(
      id,
      req.body
    );

    return res.json({
      status: 'success',
      message: 'Job berhasil diupdate',
    });
  }

  async deleteJobByIdHandler(
    req,
    res
  ) {

    const { id } = req.params;

    await this._service.deleteJobById(id);

    return res.json({
      status: 'success',
      message: 'Job berhasil dihapus',
    });
  }
}

module.exports =
  JobsHandler;