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
      return db.addIndex('Lemma', 'idx_lemma__lemma', ['lemma'], true);
    });
};

exports.down = function(db) {
  return db
    .removeIndex('Lemma', 'idx_lemma__lemma')
    .then(() => {
      return db.dropTable('Lemma');
    });
};

exports._meta = {
  "version": 1
};
