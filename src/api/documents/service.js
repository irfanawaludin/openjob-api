const pool =
  require('../../services/database');

const { nanoid } =
  require('nanoid');

class DocumentsService {

async addDocument({
  user_id,
  title,
  filename,
}) {

  const id =
    `document-${nanoid(16)}`;

  const query = {
    text: `
      INSERT INTO documents(
        id,
        user_id,
        title,
        filename
      )
      VALUES($1, $2, $3, $4)
      RETURNING id
    `,

    values: [
      id,
      user_id,
      title,
      filename,
    ],
  };

  const result =
    await pool.query(query);

  return result.rows[0].id;
}

  async getDocuments() {

    const query = {
      text: `
        SELECT *
        FROM documents
      `,
    };

    const result =
      await pool.query(query);

    return result.rows;
  }

  async getDocumentById(id) {

    const query = {
      text: `
        SELECT *
        FROM documents
        WHERE id = $1
      `,
      values: [id],
    };

    const result =
      await pool.query(query);

    return result.rows[0];
  }

  async deleteDocumentById(id) {

    const query = {
      text: `
        DELETE FROM documents
        WHERE id = $1
      `,
      values: [id],
    };

    await pool.query(query);
  }
}

module.exports =
  DocumentsService;