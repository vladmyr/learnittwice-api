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
    .createTable('Sense', {
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
          name: 'fk_sense__lemma_id',
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
          name: 'fk_sense__language_id',
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
      synsetId: {
        type: 'int',
        unsigned: true,
        notNull: true,
        foreignKey: {
          name: 'fk_sense__synset_id',
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
    .removeForeignKey('Sense', 'fk_sense__lemma_id', { dropIndex: true })
    .then(() => {
      return db.removeForeignKey('Sense', 'fk_sense__language_id', { dropIndex: true });
    })
    .then(() => {
      return db.removeForeignKey('Sense', 'fk_sense__synset_id', { dropIndex: true });
    })
    .then(() => {
      return db.dropTable('Sense');
    })
};

exports._meta = {
  "version": 1
};
