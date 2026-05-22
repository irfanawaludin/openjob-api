exports.up = (pgm) => {

  pgm.createTable('bookmarks', {

    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },

    user_id: {
      type: 'VARCHAR(50)',
      references: 'users(id)',
      onDelete: 'CASCADE',
    },

    job_id: {
      type: 'VARCHAR(50)',
      references: 'jobs(id)',
      onDelete: 'CASCADE',
    },

    created_at: {
      type: 'TIMESTAMP',
      default: pgm.func('current_timestamp'),
    },
  });
};