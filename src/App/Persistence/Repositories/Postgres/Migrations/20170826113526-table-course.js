'use strict';

var dbm;
var type;
var seed;

var TABLENAME = 'Course';
var IDX_SLUG = 'idx_course__slug';

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db
    .createTable(TABLENAME, {
      id: {
        type: 'int',
        unsigned: true,
        notNull: true,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: 'string',
        notNull: true
      },
      slug: {
        type: 'string',
        notNull: true
      },
      briefDescription: {
        type: 'text'
      }
    })
    .then(() => {
      return db.addIndex(TABLENAME, IDX_SLUG, ['slug'], true);
    });
};

exports.down = function(db) {
  return db.removeIndex(TABLENAME, IDX_SLUG)
    .then(() => db.dropTable(TABLENAME));
};

exports._meta = {
  "version": 1
};
