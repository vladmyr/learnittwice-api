'use strict';

var dbm;
var type;
var seed;

var TABLENAME = 'PropertyRelation';
var IDX_VALUE = 'idx_property_relation__value';

var SQL_DROP_TYPE = `DROP TYPE IF EXISTS "tPropertyRelation"`;
var SQL_CREATE_TYPE = `\
  ${SQL_DROP_TYPE}; \
  CREATE TYPE "tPropertyRelation" AS ENUM ('question', 'answer_correct', 'answer_wrong'); \
`;
var SQL_ALTER_TABLE = `\
  ALTER TABLE "${TABLENAME}" \
    ADD "value" "tPropertyRelation" NOT NULL DEFAULT 'question'; \
  ALTER TABLE "${TABLENAME}" \
    ADD CONSTRAINT "PropertyRelation_value_key" UNIQUE (value); \
`;

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
      // NOTE: is added manually via sql commands because of custom type
      // value: {
      //   type: 'tPropertyRelation',
      //   notNull: true,
      //   unique: true
      // }
    })
    .then(() => {
      return db.runSql(SQL_CREATE_TYPE)
        .then(() => db.runSql(SQL_ALTER_TABLE))
        .then(() => db.addIndex(TABLENAME, IDX_VALUE, ['value'], true))
    });
};

exports.down = function(db) {
  return db
    .removeIndex(TABLENAME, IDX_VALUE)
    .then(() => db.dropTable(TABLENAME))
    .then(() => db.runSql(SQL_DROP_TYPE));
};

exports._meta = {
  "version": 1
};
