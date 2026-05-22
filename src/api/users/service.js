const pool = require('../../services/database');
const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');

class UsersService {
  async addUser({ fullname, email, password }) {
    const id = `user-${nanoid(16)}`;

    const hashedPassword = await bcrypt.hash(password, 10);

    const query = {
      text: `
        INSERT INTO users(id, fullname, email, password)
        VALUES($1, $2, $3, $4)
        RETURNING id
      `,
      values: [id, fullname, email, hashedPassword],
    };

    const result = await pool.query(query);

    return result.rows[0].id;
  }

  async getUserById(id) {
    const query = {
      text: `
        SELECT id, fullname, email
        FROM users
        WHERE id = $1
      `,
      values: [id],
    };

    const result = await pool.query(query);

    return result.rows[0];
  }
}

module.exports = UsersService;