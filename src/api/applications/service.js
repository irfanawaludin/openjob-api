const pool =
  require('../../services/database');

const { nanoid } =
  require('nanoid');

class ApplicationsService {

  async addApplication({
    user_id,
    job_id,
  }) {

    const id =
      `application-${nanoid(16)}`;

    const query = {
      text: `
        INSERT INTO applications(
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

  async getApplications() {

    const query = {
      text: `
        SELECT *
        FROM applications
      `,
    };

    const result =
      await pool.query(query);

    return result.rows;
  }

  async getApplicationById(id) {

    const query = {
      text: `
        SELECT *
        FROM applications
        WHERE id = $1
      `,
      values: [id],
    };

    const result =
      await pool.query(query);

    return result.rows[0];
  }

  async getApplicationsByUser(userId) {

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

  async getApplicationsByJob(jobId) {

    const query = {
      text: `
        SELECT *
        FROM applications
        WHERE job_id = $1
      `,
      values: [jobId],
    };

    const result =
      await pool.query(query);

    return result.rows;
  }

  async editApplicationById(
    id,
    { status }
  ) {

    const query = {
      text: `
        UPDATE applications
        SET status = $1
        WHERE id = $2
      `,

      values: [status, id],
    };

    await pool.query(query);
  }

  async deleteApplicationById(id) {

    const query = {
      text: `
        DELETE FROM applications
        WHERE id = $1
      `,
      values: [id],
    };

    await pool.query(query);
  }
}

module.exports =
  ApplicationsService;