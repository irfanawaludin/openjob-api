class ApplicationsHandler {

  constructor(service) {

    this._service = service;

    this.postApplicationHandler =
      this.postApplicationHandler.bind(this);

    this.getApplicationsHandler =
      this.getApplicationsHandler.bind(this);

    this.getApplicationByIdHandler =
      this.getApplicationByIdHandler.bind(this);

    this.getApplicationsByUserHandler =
      this.getApplicationsByUserHandler.bind(this);

    this.getApplicationsByJobHandler =
      this.getApplicationsByJobHandler.bind(this);

    this.putApplicationByIdHandler =
      this.putApplicationByIdHandler.bind(this);

    this.deleteApplicationByIdHandler =
      this.deleteApplicationByIdHandler.bind(this);
  }

  async postApplicationHandler(
    req,
    res
  ) {

    const user_id =
      req.auth.id;

    const applicationId =
      await this._service.addApplication({
        user_id,
        job_id: req.body.job_id,
      });

    return res.status(201).json({
      status: 'success',
      message: 'Lamaran berhasil dibuat',
      data: {
        applicationId,
      },
    });
  }

  async getApplicationsHandler(
    req,
    res
  ) {

    const applications =
      await this._service.getApplications();

    return res.json({
      status: 'success',
      data: {
        applications,
      },
    });
  }

  async getApplicationByIdHandler(
    req,
    res
  ) {

    const { id } = req.params;

    const application =
      await this._service
        .getApplicationById(id);

    return res.json({
      status: 'success',
      data: {
        application,
      },
    });
  }

  async getApplicationsByUserHandler(
    req,
    res
  ) {

    const { userId } =
      req.params;

    const applications =
      await this._service
        .getApplicationsByUser(userId);

    return res.json({
      status: 'success',
      data: {
        applications,
      },
    });
  }

  async getApplicationsByJobHandler(
    req,
    res
  ) {

    const { jobId } =
      req.params;

    const applications =
      await this._service
        .getApplicationsByJob(jobId);

    return res.json({
      status: 'success',
      data: {
        applications,
      },
    });
  }

  async putApplicationByIdHandler(
    req,
    res
  ) {

    const { id } = req.params;

    await this._service
      .editApplicationById(
        id,
        req.body
      );

    return res.json({
      status: 'success',
      message: 'Application berhasil diupdate',
    });
  }

  async deleteApplicationByIdHandler(
    req,
    res
  ) {

    const { id } = req.params;

    await this._service
      .deleteApplicationById(id);

    return res.json({
      status: 'success',
      message: 'Application berhasil dihapus',
    });
  }
}

module.exports =
  ApplicationsHandler;