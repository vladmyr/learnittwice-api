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
    .createTable('Definition', {
      id: {
        type: 'int',
        unsigned: true,
        notNull: true,
        primaryKey: true,
        autoIncrement: true
      },
      synsetId: {
        type: 'int',
        unsigned: true,
        notNull: true,
        foreignKey: {
          name: 'fk_definition__synset_id',
          table: 'Synset',
          mapping: {
            synsetId: 'id'
          },
          rules: {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          }
        }
      }
    });
};

exports.down = function(db) {
  return db
    .removeForeignKey('Definition', 'fk_definition__synset_id', { dropIndex: true })
    .then(() => {
      return db.dropTable('Definition');
    })
};

exports._meta = {
  "version": 1
};
