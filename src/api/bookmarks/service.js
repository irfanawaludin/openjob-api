const pool =
  require('../../services/database');

const { nanoid } =
  require('nanoid');

class BookmarksService {

  async addBookmark({
    user_id,
    job_id,
  }) {

    const id =
      `bookmark-${nanoid(16)}`;

    const query = {
      text: `
        INSERT INTO bookmarks(
          id,
          user_id,
          job_id
        )
        VALUES($1, $2, $3)
        RETURNING id
      `,

      values: [
        id,
        user_id,
        job_id,
      ],
    };

    const result =
      await pool.query(query);

    return result.rows[0].id;
  }

  async getBookmarks(userId) {

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

  async getBookmarkById(id) {

    const query = {
      text: `
        SELECT *
        FROM bookmarks
        WHERE id = $1
      `,
      values: [id],
    };

    const result =
      await pool.query(query);

    return result.rows[0];
  }

  async deleteBookmark(
    userId,
    jobId
  ) {

    const query = {
      text: `
        DELETE FROM bookmarks
        WHERE user_id = $1
        AND job_id = $2
      `,

      values: [
        userId,
        jobId,
      ],
    };

    await pool.query(query);
  }
}

module.exports =
  BookmarksService;