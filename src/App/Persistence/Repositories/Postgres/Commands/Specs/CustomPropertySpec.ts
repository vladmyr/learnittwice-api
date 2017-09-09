import * as assert from 'assert';
import * as _ from 'lodash';

import { Postgres } from 'src/Test/Util/Mocha';
import CustomPropertyCommands from '../CustomPropertyCommands';

const customPropertyCommands = CustomPropertyCommands.GetInstance();
const db = customPropertyCommands.getDb();

describe('[AbstractCommands] CustomPropertyCommands', () => {
  describe('#createOne', () => {
    it ('creates new record', () => {
      const customPropertyProps = {
        knowledgeUnitId: 1,
        propertyRelationId: 3,
        dataType: 'string',
        name: 'Wrong answer #4',
        slug: 'wrong_answer_4',
        value: '8818'
      }

      return Postgres.ResolveTest(db.tx(async (t) => {
        const customProperty = await customPropertyCommands
        .createOne(customPropertyProps, t);
        const savedCustomPropertyProps = _.omit(customProperty, 'id');

        assert.equal(typeof customProperty.id, 'number');
        assert.deepEqual(savedCustomPropertyProps, customPropertyProps);

        return Postgres.Rollback();
      }))
    })
  })

  describe('#updateOne', () => {
    it ('updates existing record', () => {
      const customPropertyId = 3;
      const customPropertyProps = {
        knowledgeUnitId: 1,
        propertyRelationId: 3,
        dataType: 'string',
        name: 'Wrong answer #4',
        slug: 'wrong_answer_4',
        value: '8818'
      };

      return Postgres.ResolveTest(db.tx(async (t) => {
        const customProperty = await customPropertyCommands
          .updateOne(customPropertyId, customPropertyProps, t);
        const updatedCustomPropertyProps = _.omit(customProperty, 'id');

        assert.equal(customProperty.id, customPropertyId);
        assert.deepEqual(updatedCustomPropertyProps, customPropertyProps);

        return Postgres.Rollback();
      }))
    })

    it ('returns null on updating non-existing record', () => {
      const customPropertyId = 1001;
      const customPropertyProps = {
        knowledgeUnitId: 1,
        propertyRelationId: 3,
        dataType: 'string',
        name: 'Wrong answer #4',
        slug: 'wrong_answer_4',
        value: '8818'
      };
      
      return Postgres.ResolveTest(db.tx(async (t) => {
        const customProperty = await customPropertyCommands
          .updateOne(customPropertyId, customPropertyProps, t);

        assert.equal(customProperty, null);

        return Postgres.Rollback();
      }))
    })
  })

  describe('#deleteOne', () => {
    it ('silently deletes existing record', () => {
      return Postgres.ResolveTest(db.tx(async (t) => {
        try {
          await customPropertyCommands.deleteOne(1, t);
        } catch (e) {
          assert.ifError(e)
        } finally {
          return Postgres.Rollback();
        }
      }))
    })

    it ('silently does nothing if record with id doesn\'t exist', () => {
      return Postgres.ResolveTest(db.tx(async (t) => {
        try {
          await customPropertyCommands.deleteOne(1001, t);
        } catch(e) {
          assert.ifError(e);
        } finally {
          return Postgres.Rollback();
        }
      }))
    }) 
  })

  describe('#deleteMany', () => {
    it ('silently deletes existing records', () => {
      return Postgres.ResolveTest(db.tx(async (t) => {
        try {
          await customPropertyCommands.deleteMany([1,2], t);
        } catch (e) {
          assert.ifError(e)
        } finally {
          return Postgres.Rollback();
        }
      }))
    })

    it ('silently does nothing if records with ids don\'t exist', () => {
      return Postgres.ResolveTest(db.tx(async (t) => {
        try {
          await customPropertyCommands.deleteMany([1001,1002, 1003], t);
        } catch(e) {
          assert.ifError(e);
        } finally {
          return Postgres.Rollback();
        }
      }))
    }) 
  })
})