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
    .createTable('RefSenseLexemeForm', {
      id: {
        type: 'int',
        unsigned: true,
        notNull: true,
        primaryKey: true,
        autoIncrement: true
      },
      senseId: {
        type: 'int',
        unsigned: true,
        notNull: true,
        foreignKey: {
          name: 'fk_refsenselexemeform__sense_id',
          table: 'Sense',
          mapping: {
            senseId: 'id'
          },
          rules: {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          }
        }
      },
      lexemeFormId: {
        type: 'int',
        unsigned: true,
        notNull: true,
        foreignKey: {
          name: 'fk_refsenselexemeform__form_id',
          table: 'LexemeForm',
          mapping: {
            lexemeFormId: 'id'
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
    .removeForeignKey(
      'RefSenseLexemeForm', 
      'fk_refsenselexemeform__sense_id', 
      { dropIndex: true }
    )
    .then(() => {
      return db.removeForeignKey(
        'RefSenseLexemeForm',
        'fk_refsenselexemeform__form_id',
        { dropIndex: true }
      )
    })
    .then(() => {
      return db.dropTable('RefSenseLexemeForm');
    })
};

exports._meta = {
  "version": 1
};
