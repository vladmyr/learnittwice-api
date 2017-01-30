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
    .createTable('Lexeme', {
      id: {
        type: 'int',
        unsigned: true,
        notNull: true,
        primaryKey: true,
        autoIncrement: true
      },
      lemmaId: {
        type: 'int',
        unsigned: true,
        notNull: true,
        foreignKey: {
          name: 'fk_lexeme__lemma_id',
          table: 'Lemma',
          mapping: {
            lemmaId: 'id'
          },
          rules: {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          }
        }
      },
      languageId: {
        type: 'int',
        unsigned: true,
        notNull: true,
        foreignKey: {
          name: 'fk_lexeme__language_id',
          table: 'Language',
          mapping: {
            languageId: 'id'
          },
          rules: {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          }
        }
      },
      senseId: {
        type: 'int',
        unsigned: true,
        notNull: true,
        foreignKey: {
          name: 'fk_lexeme__sense_id',
          table: 'Sense',
          mapping: {
            senseId: 'id'
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
    .removeForeignKey('Lexeme', 'fk_lexeme__lemma_id', { dropIndex: true })
    .then(() => {
      return db.removeForeignKey('Lexeme', 'fk_lexeme__language_id', { dropIndex: true });
    })
    .then(() => {
      return db.removeForeignKey('Lexeme', 'fk_lexeme__sense_id', { dropIndex: true });
    })
    .then(() => {
      return db.dropTable('Lexeme');
    })
};

exports._meta = {
  "version": 1
};
