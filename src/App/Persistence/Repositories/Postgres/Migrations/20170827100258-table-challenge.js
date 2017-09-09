'use strict';

var dbm;
var type;
var seed;

var TABLENAME = 'Challenge';
var FK_KNOWLEDGE_UNIT_ID = 'fk_challenge__knowledge_unit_id';
var IDX_KNOWLEDGE_UNIT_ID_CHALLENGE_TYPE = 'idx_challenge__knowledge_unit_id__challenge_type'
var SQL_DROP_TYPE = `DROP TYPE IF EXISTS "tChallengeType"`;
var SQL_CREATE_TYPE = `\
  ${SQL_DROP_TYPE}; \
  CREATE TYPE "tChallengeType" AS ENUM ('typein_lemma', 'typein_answer', 'select_choiсe') \
`;
var SQL_ALTER_TABLE = `\
  ALTER TABLE "${TABLENAME}" \
    ADD "challengeType" "tChallengeType" NOT NULL DEFAULT 'typein_lemma' \
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
        unsignend: true,
        notNull: true,
        primaryKey: true,
        autoIncrement: true
      },
      knowledgeUnitId: {
        type: 'int',
        unsigned: true,
        notNull: true,
        foreignKey: {
          name: FK_KNOWLEDGE_UNIT_ID,
          table: 'KnowledgeUnit',
          mapping: {
            knowledgeUnitId: 'id'
          },
          rules: {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          }
        }
      },
      // NOTE: is added manually via sql commands because of custom type
      // challengeType: {
      //   type: 'tChallengeType',
      //   notNull: true
      // }
    })
    .then(() => db.runSql(SQL_CREATE_TYPE))
    .then(() => db.runSql(SQL_ALTER_TABLE))
    .then(() => {
      return db.addIndex(
        TABLENAME, 
        IDX_KNOWLEDGE_UNIT_ID_CHALLENGE_TYPE, 
        ['knowledgeUnitId', 'challengeType'], 
        true
      );
    })
};

exports.down = function(db) {
  return db.removeIndex(TABLENAME, IDX_KNOWLEDGE_UNIT_ID_CHALLENGE_TYPE)
    .then(() => db.dropTable(TABLENAME))
    .then(() => db.runSql(SQL_DROP_TYPE));
};

exports._meta = {
  "version": 1
};
