'use strict';

var dbm;
var type;
var seed;

var TABLENAME = 'KnowledgeUnit';
var IDX_LESSON_ID_ORDER = 'idx_knowledge_unit__lesson_id__order';
var FK_LESSON_ID = 'fk_knowledge_unit__lession_id';

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
    .createTable(TABLENAME, {
      id: {
        type: 'int',
        unsigned: true,
        notNull: true,
        primaryKey: true,
        autoIncrement: true
      },
      lessonId: {
        type: 'int',
        unsigned: true,
        notNull: true,
        foreignKey: {
          name: FK_LESSON_ID,
          table: 'Lesson',
          mapping: {
            lessonId: 'id'
          },
          rules: {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          }
        }
      },
      order: {
        type: 'int',
        unsigned: true,
        notNull: true,
        unique: true,
        defaultValue: 0
      },
      isPublished: {
        type: 'boolean',
        notNull: true,
        defaultValue: false
      }
    })
    .then(() => {
      return db.addIndex(
        TABLENAME, 
        IDX_LESSON_ID_ORDER, 
        ['lessonId', 'order'], 
        true
      );
    });
};

exports.down = function(db) {
  return db
    .removeIndex(TABLENAME, IDX_LESSON_ID_ORDER)
    .then(() => {
      return db.dropTable(TABLENAME);
    });
};

exports._meta = {
  "version": 1
};
