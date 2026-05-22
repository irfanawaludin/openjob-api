exports.up = (pgm) => {
  pgm.createTable('companies', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    name: {
      type: 'VARCHAR(100)',
      notNull: true,
    },
    description: {
      type: 'TEXT',
      notNull: false,
    },
    location: {
      type: 'VARCHAR(100)',
      notNull: false,
    },
    owner_id: {
      type: 'VARCHAR(50)',
      references: 'users(id)',
      onDelete: 'CASCADE',
    },
    created_at: {
      type: 'TIMESTAMP',
      default: pgm.func('current_timestamp'),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('companies');
};