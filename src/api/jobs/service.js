const pool =
  require('../../services/database');

const { nanoid } =
  require('nanoid');

class JobsService {

  async addJob({
    title,
    description,
    salary,
    company_id,
    category_id,
  }) {

    const id =
      `job-${nanoid(16)}`;

    const query = {
      text: `
        INSERT INTO jobs(
          id,
          title,
          description,
          salary,
          company_id,
          category_id
        )
        VALUES($1, $2, $3, $4, $5, $6)
        RETURNING id
      `,

      values: [
        id,
        title,
        description,
        salary,
        company_id,
        category_id,
      ],
    };

    const result =
      await pool.query(query);

    return result.rows[0].id;
  }

  async getJobs(filters = {}) {

    let query = `
      SELECT
        jobs.*,
        companies.name AS company_name,
        categories.name AS category_name
      FROM jobs
      JOIN companies
      ON companies.id = jobs.company_id
      JOIN categories
      ON categories.id = jobs.category_id
    `;

    const values = [];

    if (filters.title) {
      values.push(`%${filters.title}%`);

      query += `
        WHERE jobs.title ILIKE $${values.length}
      `;
    }

    if (filters.companyName) {

      values.push(
        `%${filters.companyName}%`
      );

      query += values.length === 1
        ? `
          WHERE companies.name ILIKE $${values.length}
        `
        : `
          AND companies.name ILIKE $${values.length}
        `;
    }

    const result =
      await pool.query(query, values);

    return result.rows;
  }

  async getJobById(id) {

    const query = {
      text: `
        SELECT *
        FROM jobs
        WHERE id = $1
      `,
      values: [id],
    };

    const result =
      await pool.query(query);

    return result.rows[0];
  }

  async getJobsByCompany(companyId) {

    const query = {
      text: `
        SELECT *
        FROM jobs
        WHERE company_id = $1
      `,
      values: [companyId],
    };

    const result =
      await pool.query(query);

    return result.rows;
  }

  async getJobsByCategory(categoryId) {

    const query = {
      text: `
        SELECT *
        FROM jobs
        WHERE category_id = $1
      `,
      values: [categoryId],
    };

    const result =
      await pool.query(query);

    return result.rows;
  }

  async editJobById(
    id,
    {
      title,
      description,
      salary,
      company_id,
      category_id,
    }
  ) {

    const query = {
      text: `
        UPDATE jobs
        SET
          title = $1,
          description = $2,
          salary = $3,
          company_id = $4,
          category_id = $5
        WHERE id = $6
      `,

      values: [
        title,
        description,
        salary,
        company_id,
        category_id,
        id,
      ],
    };

    await pool.query(query);
  }

  async deleteJobById(id) {

    const query = {
      text: `
        DELETE FROM jobs
        WHERE id = $1
      `,
      values: [id],
    };

    await pool.query(query);
  }
}

module.exports =
  JobsService;