const pool = require('../../services/database');

class ProfileService {
  async getProfile(id) {
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

  async getMyApplications(userId) {

  const query = {
    text: `
      SELECT *
      FROM applications
      WHERE user_id = $1
    `,
    values: [userId],
  };

  const result =
    await pool.query(query);

  return result.rows;
}

async getMyBookmarks(userId) {

  const query = {
    text: `
      SELECT *
      FROM bookmarks
      WHERE user_id = $1
    `,
    values: [userId],
  };

  const result =
    await pool.query(query);

  return result.rows;
}
}

module.exports = ProfileService;