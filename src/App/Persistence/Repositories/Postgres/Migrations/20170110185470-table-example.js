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
    .createTable('Example', {
      id: {
        type: 'int',
        unsigned: true,
        notNull: true,
        primaryKey: true,
        autoIncrement: true
      },
      definitionId: {
        type: 'int',
        unsigned: true,
        notNull: true,
        foreignKey: {
          name: 'fk_example__definition_id',
          table: 'Definition',
          mapping: {
            definitionId: 'id'
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
    .removeForeignKey('Example', 'fk_example__definition_id', { dropIndex: true})
    .then(() => {
      return db.dropTable('Example');
    })
};

exports._meta = {
  "version": 1
};
