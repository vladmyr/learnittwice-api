'use strict';

var dbm;
var type;
var seed;

exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db
    .createTable('Language', {
      id: {
        type: 'int',
        unsigned: true,
        notNull: true,
        primaryKey: true,
        autoIncrement: true
      },
      iso: {
        type: 'char',
        length: 5,
        notNull: true,
        unique: true
      }
    })
    .then(() => {
      return db.addIndex('Language', 'idx_language__iso', ['iso'], true);
    })
};

exports.down = function(db) {
  return db
    .removeIndex('Language', 'idx_language__iso')
    .then(() => {
      return db.dropTable('Language');
    })
};

exports._meta = {
  "version": 1
};
