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
    .createTable('LexemeForm', {
      id: {
        type: 'int',
        unsigned: true,
        notNull: true,
        primaryKey: true,
        autoIncrement: true
      },
      form: {
        type: 'text',
        notNull: true,
        unique: true
      }
    })
    .then(() => {
      return db.addIndex(
        'LexemeForm', 
        'idx_lexeme_form__form', 
        ['form'], 
        true
      );
    });
};

exports.down = function(db) {
  return db
    .removeIndex('LexemeForm', 'idx_lexeme_form__form')
    .then(() => {
      return db.dropTable('LexemeForm');
    })
};

exports._meta = {
  "version": 1
};
