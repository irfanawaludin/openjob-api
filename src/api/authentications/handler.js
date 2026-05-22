const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require('../../utils/tokenize');

class AuthenticationsHandler {

  constructor(service) {

    this._service = service;

    this.postAuthenticationHandler =
      this.postAuthenticationHandler.bind(this);

    this.putAuthenticationHandler =
      this.putAuthenticationHandler.bind(this);

    this.deleteAuthenticationHandler =
      this.deleteAuthenticationHandler.bind(this);
  }

  async postAuthenticationHandler(
    req,
    res
  ) {

    const {
      email,
      password,
    } = req.body;

    const id =
      await this._service
        .verifyUserCredential(
          email,
          password
        );

    const accessToken =
      generateAccessToken({ id });

    const refreshToken =
      generateRefreshToken({ id });

    await this._service
      .addRefreshToken(
        refreshToken
      );

    return res.status(201).json({
      status: 'success',
      message: 'Login berhasil',
      data: {
        accessToken,
        refreshToken,
      },
    });
  }

  async putAuthenticationHandler(
    req,
    res
  ) {

    const { refreshToken } =
      req.body;

    await this._service
      .verifyRefreshToken(
        refreshToken
      );

    const decoded =
      verifyRefreshToken(
        refreshToken
      );

    const accessToken =
      generateAccessToken({
        id: decoded.id,
      });

    return res.json({
      status: 'success',
      data: {
        accessToken,
      },
    });
  }

  async deleteAuthenticationHandler(
    req,
    res
  ) {

    const { refreshToken } =
      req.body;

    await this._service
      .deleteRefreshToken(
        refreshToken
      );

    return res.json({
      status: 'success',
      message: 'Logout berhasil',
    });
  }
}

module.exports =
  AuthenticationsHandler;