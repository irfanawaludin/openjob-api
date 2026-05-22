exports.up = (pgm) => {
  pgm.createTable('jobs', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    title: {
      type: 'VARCHAR(100)',
      notNull: true,
    },
    description: {
      type: 'TEXT',
      notNull: true,
    },
    salary: {
      type: 'VARCHAR(50)',
      notNull: false,
    },
    company_id: {
      type: 'VARCHAR(50)',
      references: 'companies(id)',
      onDelete: 'CASCADE',
    },
    category_id: {
      type: 'VARCHAR(50)',
      references: 'categories(id)',
      onDelete: 'CASCADE',
    },
    created_at: {
      type: 'TIMESTAMP',
      default: pgm.func('current_timestamp'),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('jobs');
};