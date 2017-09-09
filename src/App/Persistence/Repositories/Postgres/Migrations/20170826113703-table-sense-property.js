'use strict';

var dbm;
var type;
var seed;

var TABLENAME = 'SenseProperty';
var FK_KNOWLEDGE_UNIT_ID = 'fk_sense_property__knowledge_unit_id';
var FK_SENSE_ID = 'fk_sense_property__sense_id';
var FK_PROPERTY_RELATION_ID = 'fk_sense_property__property_relation_id';
var IDX_KNOWLEDGE_UNIT_ID_PROPERY_RELATION_ID = 'idx_sense_property__knowledge_unit_id__property_relation_id';


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
      senseId: {
        type: 'int',
        unsigned: true,
        notNull: true,
        foreignKey: {
          name: FK_SENSE_ID,
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
      }
    })
    then(() => {
      return db.createIndex(
        TABLENAME, 
        IDX_KNOWLEDGE_UNIT_ID_PROPERY_RELATION_ID,
        ['knowledgeUnitId', 'propertyRelationId']
      )
    })
};

exports.down = function(db) {
  return db.removeIndex(TABLENAME, IDX_KNOWLEDGE_UNIT_ID_PROPERY_RELATION_ID)
    .then(() => db.dropTable(TABLENAME));
};

exports._meta = {
  "version": 1
};
