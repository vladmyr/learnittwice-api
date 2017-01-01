'use strict';

var dbm;
var type;
var seed;

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
    .createTable('Lemma', {
      id: {
        type: 'int',
        unsigned: true,
        notNull: true,
        primaryKey: true,
        autoIncrement: true
      },
      lemma: {
        type: 'text',
        notNull: true,
        unique: true
      }
    })
    .then(() => {
      return db.addIndex('Lemma', 'lemma_lemma_index', ['lemma'], true);
    });
};

exports.down = function(db) {
  return db
    .removeIndex('Lemma', 'lemma_lemma_index')
    .then(() => {
      return db.dropTable('lemma');
    });
};

exports._meta = {
  "version": 1
};
