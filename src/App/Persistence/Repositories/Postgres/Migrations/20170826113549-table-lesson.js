'use strict';

var dbm;
var type;
var seed;

var TABLENAME = 'Lesson'
var FK_COURSE_ID = 'fk_lesson__course_id';
var IDX_COURSE_ID_ORDER = 'idx_lesson__course_id__order';

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
      courseId: {
        type: 'int',
        unsigned: true,
        notNull: true,
        foreignKey: {
          name: FK_COURSE_ID,
          table: 'Course',
          mapping: {
            courseId: 'id'
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
        IDX_COURSE_ID_ORDER, 
        ['courseId', 'order'],
        true
      )
    })
};

exports.down = function(db) {
  return db.removeIndex(TABLENAME, IDX_COURSE_ID_ORDER)
    .then(() => db.dropTable(TABLENAME));
};

exports._meta = {
  "version": 1
};
