const pool =
  require('../../services/database');

const { nanoid } =
  require('nanoid');

class CategoriesService {

  async addCategory({ name }) {
    const id =
      `category-${nanoid(16)}`;

    const query = {
      text: `
        INSERT INTO categories(id, name)
        VALUES($1, $2)
        RETURNING id
      `,
      values: [id, name],
    };

    const result =
      await pool.query(query);

    return result.rows[0].id;
  }

  async getCategories() {
    const query = {
      text: `
        SELECT *
        FROM categories
      `,
    };

    const result =
      await pool.query(query);

    return result.rows;
  }

  async getCategoryById(id) {
    const query = {
      text: `
        SELECT *
        FROM categories
        WHERE id = $1
      `,
      values: [id],
    };

    const result =
      await pool.query(query);

    return result.rows[0];
  }

  async editCategoryById(id, { name }) {
    const query = {
      text: `
        UPDATE categories
        SET name = $1
        WHERE id = $2
      `,
      values: [name, id],
    };

    await pool.query(query);
  }

  async deleteCategoryById(id) {
    const query = {
      text: `
        DELETE FROM categories
        WHERE id = $1
      `,
      values: [id],
    };

    await pool.query(query);
  }
}

module.exports =
  CategoriesService;