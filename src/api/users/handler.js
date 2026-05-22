class UsersHandler {
  constructor(service) {
    this._service = service;

    this.postUserHandler = this.postUserHandler.bind(this);
    this.getUserByIdHandler = this.getUserByIdHandler.bind(this);
  }

  async postUserHandler(req, res) {
    const userId = await this._service.addUser(req.body);

    return res.status(201).json({
      status: 'success',
      message: 'User berhasil dibuat',
      data: {
        userId,
      },
    });
  }

  async getUserByIdHandler(req, res) {
    const { id } = req.params;

    const user = await this._service.getUserById(id);

    return res.json({
      status: 'success',
      data: {
        user,
      },
    });
  }
}

module.exports = UsersHandler;