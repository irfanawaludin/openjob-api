const pool = require('../../services/database');
const bcrypt = require('bcrypt');

class AuthenticationsService {
  async verifyUserCredential(email, password) {
    const query = {
      text: `
        SELECT id, password
        FROM users
        WHERE email = $1
      `,
      values: [email],
    };

    const result = await pool.query(query);

    if (!result.rows.length) {
      throw new Error('Email tidak ditemukan');
    }

    const user = result.rows[0];

    const match = await bcrypt.compare(
      password,
      user.password
    );

    if (!match) {
      throw new Error('Password salah');
    }

    return user.id;
  }

  async addRefreshToken(token) {
    const query = {
      text: `
        INSERT INTO authentications(token)
        VALUES($1)
      `,
      values: [token],
    };

    await pool.query(query);
  }

 async verifyRefreshToken(
  refreshToken
) {

  const query = {
    text: `
      SELECT token
      FROM authentications
      WHERE token = $1
    `,
    values: [refreshToken],
  };

  const result =
    await pool.query(query);

  if (!result.rows.length) {
    throw new Error(
      'Refresh token tidak valid'
    );
  }
}

  async deleteRefreshToken(token) {
    const query = {
      text: `
        DELETE FROM authentications
        WHERE token = $1
      `,
      values: [token],
    };

    await pool.query(query);
  }
}

module.exports = AuthenticationsService;