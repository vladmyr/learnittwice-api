import * as assert from 'assert';
import LemmaQueriesGph from '../LemmaQueriesGph';
import * as _ from 'underscore';

const lemmaQueriesGph = LemmaQueriesGph.GetInstance();
const connector = lemmaQueriesGph.getConnector();

describe('LemmaQueriesGph', () => {
  describe('#findOne', () => {
    it ('finds existing lemma', () => {
      const lemmaId = 1;

      return connector.inSession2(async (session) => {
        const tx = session.beginTransaction();

        try {
          const obtainedNode = await lemmaQueriesGph.findOne(lemmaId, tx);
          assert.equal(obtainedNode.id, lemmaId)
        } catch(err) {
          assert.ifError(err);
        } finally {
          return tx.rollback();
        }
      })
    })

    it ('returns undefined for non-existing lemmas', () => {
      const lemmaId = 1001;

      return connector.inSession2(async (session) => {
        const tx = session.beginTransaction();

        try {
          const obtainedNode = await lemmaQueriesGph.findOne(lemmaId, tx);
          assert.equal(obtainedNode, undefined);
        } catch (err) {
          assert.ifError(err);
        } finally {
          return tx.rollback();
        }
      })
    })
  })

  describe('#findMany', () => {
    it ('finds all existing lemmas', () => {
      const lemmaIds = [1,2,4];

      return connector.inSession2(async (session) => {
        const tx = session.beginTransaction();

        try {
          const obtainedNodes = await lemmaQueriesGph.findMany(lemmaIds, tx);

          // assert length
          assert.notEqual(obtainedNodes, undefined);
          assert.equal(obtainedNodes.length > 0, true);
          assert.equal(obtainedNodes.length, lemmaIds.length);

          // assert ids
          _.each(obtainedNodes, (obtainedNode, ) => {
            assert.notEqual(lemmaIds.indexOf(obtainedNode.id), -1);
          });
        } catch (err) {
          assert.ifError(err);
        } finally {
          return tx.rollback();
        }
      });
    })

    it ('finds only existing lemmas', () => {
      const exisingIds = [1,2];
      const nonExistingIds = [1001, 1002, 1003];
      const ids = exisingIds.concat(nonExistingIds);

      return connector.inSession2(async (session) => {
        const tx = session.beginTransaction();

        try {
          const obtainedNodes = await lemmaQueriesGph.findMany(ids, tx);

          assert.notEqual(obtainedNodes, undefined);
          assert.equal(obtainedNodes.length > 0, true);
          assert.equal(obtainedNodes.length, exisingIds.length);

          _.each(obtainedNodes, (obtainedNode) => {
            assert.notEqual(exisingIds.indexOf(obtainedNode.id), -1);
          });
        } catch (err) {
          assert.ifError(err);
        } finally {
          return tx.rollback();
        }
      })
    })

    it ('returns empty array if no nodes were found', () => {
      const nonExistingIds = [1001, 1002, 1003];

      return connector.inSession2(async (session) => {
        const tx = session.beginTransaction();

        try {
          const obtainedNodes = await lemmaQueriesGph.findMany(nonExistingIds, tx);

          assert.notEqual(obtainedNodes, undefined);
          assert.equal(obtainedNodes.length > 0, false);
          assert.equal(obtainedNodes.length, 0);
        } catch (err) {
          assert.ifError(err);
        } finally {
          return tx.rollback();
        }
      })
    })
  })
})