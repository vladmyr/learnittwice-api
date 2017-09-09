'use strict';

var dbm;
var type;
var seed;

var TABLENAME = 'CustomProperty';
var FK_KNOWLEDGE_UNIT_ID = 'fk_custom_property__knowledge_unit_id';
var FK_PROPERTY_RELATION_ID = 'fk_custom_property__property_relation_id';
var IDX_NAME = 'idx_custom_property_name';
var IDX_SLUG = 'idx_custom_property_slug';
var IDX_VALUE = 'idx_custom_property_value';

// PG specific related commands
var SQL_DROP_TYPE = `DROP TYPE IF EXISTS "tDataType"`;
var SQL_CREATE_TYPE = `\
  ${SQL_DROP_TYPE}; \
  CREATE TYPE "tDataType" AS ENUM ('string', 'image', 'audio'); \
`;
var SQL_ALTER_TABLE = `\
  ALTER TABLE "${TABLENAME}" \
    ADD "dataType" "tDataType" NOT NULL DEFAULT 'string' \
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
      propertyRelationId: {
        type: 'int',
        unsigned: true,
        notNull: true,
        foreignKey: {
          name: FK_PROPERTY_RELATION_ID,
          table: 'PropertyRelation',
          mapping: {
            propertyRelationId: 'id'
          },
          rules: {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          }
        }
      },
      // NOTE: is added manually via sql commands because of custom type
      // dataType: {
      //   type: 'tDataType',
      //   notNull: true
      // },
      name: {
        type: 'string',
        notNull: true,
      },
      slug: {
        type: 'string',
        notNull: true,
      },
      value: {
        type: 'text',
        notNull: true
      }
    })
    .then(() => db.runSql(SQL_CREATE_TYPE))
    .then(() => db.runSql(SQL_ALTER_TABLE))
    .then(() => {
      return db.addIndex(TABLENAME, IDX_NAME, ['knowledgeUnitId', 'name'], true);
    })
    .then(() => {
      return db.addIndex(TABLENAME, IDX_SLUG, ['knowledgeUnitId', 'slug'], true);
    })
    .then(() => {
      return db.addIndex(TABLENAME, IDX_VALUE, ['knowledgeUnitId', 'value'], true);
    })
};

exports.down = function(db) {
  return db.removeIndex(TABLENAME, IDX_NAME)
    .then(() => db.removeIndex(TABLENAME, IDX_SLUG))
    .then(() => db.removeIndex(TABLENAME, IDX_VALUE))
    .then(() => db.dropTable(TABLENAME))
    .then(() => db.runSql(SQL_DROP_TYPE));
};

exports._meta = {
  "version": 1
};
