/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('users', {
    id: 'id',
    name: { type: 'varchar(1000)', notNull: true },
    birthday: { type: 'timestamp', notNull: true},
    socialize: { type: 'varchar(1000)', notNull: true },
    school: { type: 'varchar(1000)', notNull: true },
    department: { type: 'varchar(1000)', notNull: true },
    interestsAndExpertise: { type: 'varchar(1000)', notNull: true },
    club: { type: 'varchar(1000)', notNull: true },
    course: { type: 'varchar(1000)', notNull: true },
    country: { type: 'varchar(1000)', notNull: true },
    troubles: { type: 'varchar(1000)', notNull: true },
    exchangeable: { type: 'varchar(1000)', notNull: true },
    trying: { type: 'varchar(1000)', notNull: true },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  })
  pgm.createIndex('users', 'name')
};

exports.down = pgm => {};
