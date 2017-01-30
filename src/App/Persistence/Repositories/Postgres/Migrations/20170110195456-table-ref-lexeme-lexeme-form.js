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
    .createTable('RefLexemeLexemeForm', {
      id: {
        type: 'int',
        unsigned: true,
        notNull: true,
        primaryKey: true,
        autoIncrement: true
      },
      lexemeId: {
        type: 'int',
        unsigned: true,
        notNull: true,
        foreignKey: {
          name: 'fk_ref_lexemelexemeform__lexeme_id',
          table: 'Lexeme',
          mapping: {
            lexemeId: 'id'
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
          name: 'fk_ref_lexemelexemeform_lexeme__form_id',
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
      'RefLexemeLexemeForm', 
      'fk_ref_lexemelexemeform__lexeme_id', 
      { dropIndex: true }
    )
    .then(() => {
      return db.removeForeignKey(
        'RefLexemeLexemeForm',
        'fk_ref_lexemelexemeform_lexeme__form_id',
        { dropIndex: true }
      )
    })
    .then(() => {
      return db.dropTable('RefLexemeLexemeForm');
    })
};

exports._meta = {
  "version": 1
};
