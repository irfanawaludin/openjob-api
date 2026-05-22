const pool =
  require('../../services/database');

const { nanoid } =
  require('nanoid');

class CompaniesService {

  async addCompany({
    name,
    description,
    location,
    ownerId,
  }) {

    const id =
      `company-${nanoid(16)}`;

    const query = {
      text: `
        INSERT INTO companies(
          id,
          name,
          description,
          location,
          owner_id
        )
        VALUES($1, $2, $3, $4, $5)
        RETURNING id
      `,

      values: [
        id,
        name,
        description,
        location,
        ownerId,
      ],
    };

    const result =
      await pool.query(query);

    return result.rows[0].id;
  }

  async getCompanies() {
    const query = {
      text: `
        SELECT *
        FROM companies
      `,
    };

    const result =
      await pool.query(query);

    return result.rows;
  }

  async getCompanyById(id) {
    const query = {
      text: `
        SELECT *
        FROM companies
        WHERE id = $1
      `,
      values: [id],
    };

    const result =
      await pool.query(query);

    return result.rows[0];
  }

  async editCompanyById(
    id,
    {
      name,
      description,
      location,
    }
  ) {

    const query = {
      text: `
        UPDATE companies
        SET
          name = $1,
          description = $2,
          location = $3
        WHERE id = $4
      `,

      values: [
        name,
        description,
        location,
        id,
      ],
    };

    await pool.query(query);
  }

  async deleteCompanyById(id) {
    const query = {
      text: `
        DELETE FROM companies
        WHERE id = $1
      `,
      values: [id],
    };

    await pool.query(query);
  }
}

module.exports =
  CompaniesService;