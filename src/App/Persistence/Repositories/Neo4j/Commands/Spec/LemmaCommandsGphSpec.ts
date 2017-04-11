import * as assert from 'assert';
import LemmaCommandsGph from '../LemmaCommandsGph';

const lemmaCommandsGph = LemmaCommandsGph.GetInstance();
const connector = lemmaCommandsGph.getConnector();

describe('LemmaCommandsGph', () => {
  describe('#createOne', () => {
    it('creates new lemma', () => {
      const lemmaId = 1001;
      
      return connector.inSession2(async (session) => {
        const tx = session.beginTransaction();

        try {
          const savedNode = await lemmaCommandsGph.createOne(lemmaId, tx);
          assert.equal(savedNode.id, lemmaId);

          return tx.rollback();
        } catch (err) {
          assert.ifError(err);

          return tx.rollback();
        }
      })
    })
  })

  describe('#deleteOne', () => {
    it('deletes newly created lemma', () => {
      const lemmaId = 1001;

      return connector.inSession2(async (session) => {
        const tx = session.beginTransaction();

        try {
          const savedLemma = await lemmaCommandsGph.createOne(lemmaId, tx);
          assert.equal(savedLemma.id, lemmaId);

          const hasUpdates = await lemmaCommandsGph.deleteOne(savedLemma.id, tx);
          assert.equal(hasUpdates, true);

          return tx.rollback();
        } catch (err) {
          assert.ifError(err);

          return tx.rollback();
        }
      });
    })

    it('deletes non existing lemma silently', () => {
      const lemmaId = 1001;

      return connector.inSession2(async (session) => {
        const tx = session.beginTransaction();

        try {
          const hasDeleted = await lemmaCommandsGph.deleteOne(lemmaId, tx);
          assert.equal(hasDeleted, false);

          return tx.rollback();
        } catch (err) {
          assert.ifError(err);

          return tx.rollback();
        }
      })
    })
  });

  describe('#createRelationOne', () => {
    it ('creates relation for newly created lemma and existing sense', () => {
      const lemmaId = 1001;
      const senseId = 11;     // provided by graph seed
      const relationLabel = 'Sense';
      const nodeLabel = 'Sense';

      return connector.inSession2(async (session) => {
        const tx = session.beginTransaction();

        try {
          const savedLemma = await lemmaCommandsGph.createOne(lemmaId, tx);
          const hasCreated = await lemmaCommandsGph
            .createRelationOne(savedLemma.id, relationLabel, senseId, nodeLabel, tx);
          
          assert.equal(hasCreated, true);

          return tx.rollback();
        } catch (err) {
          assert.ifError(err);

          return tx.rollback();
        }
      });
    })
  });

  describe('#deleteRelationOne', () => {
    it ('deletes relation for newly created lemma and existing sense', () => {
      const lemmaId = 1001;
      const senseId = 11;     // provided by graph seed
      const relationLabel = 'Sense';
      const nodeLabel = 'Sense';

      return connector.inSession2(async (session) => {
        const tx = session.beginTransaction();

        try {
          const savedLemma = await lemmaCommandsGph.createOne(lemmaId, tx);
          const hasCreated = await lemmaCommandsGph
            .createRelationOne(savedLemma.id, relationLabel, senseId, nodeLabel, tx);
            
          assert.equal(hasCreated, true);

          const hasDeleted = await lemmaCommandsGph
            .deleteRelationOne(savedLemma.id, relationLabel, senseId, nodeLabel, tx);

          assert.equal(hasDeleted, true);

          return tx.rollback();
        } catch (err) {
          assert.ifError(err);

          return tx.rollback();
        }
      });
    })
  });
})