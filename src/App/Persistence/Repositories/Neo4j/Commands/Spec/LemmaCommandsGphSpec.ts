import * as assert from 'assert';
import LemmaCommandsGph from '../LemmaCommandsGph';

const lemmaCommandsGph = LemmaCommandsGph.GetInstance();
const connector = lemmaCommandsGph.getConnector();

describe('LemmaCommandsGph', () => {
  describe('#createOne', () => {
    it('creates new lemma', (done) => {
      const lemmaId = 1001;
      
      connector.inSession(async (session, fulfill, reject) => {
        const tx = session.beginTransaction();

        try {
          const savedNode = await lemmaCommandsGph.createOne(lemmaId, tx);
          assert.equal(savedNode.id, lemmaId);

          await tx.rollback();
          return fulfill();
        } catch (err) {
          assert.ifError(err);

          await tx.rollback();
          return reject(err);
        }
      }).then(done);
    })
  })

  describe('#deleteOne', () => {
    it('deletes newly created lemma', (done) => {
      const lemmaId = 1001;

      connector.inSession(async (session, fulfill, reject) => {
        const tx = session.beginTransaction();

        try {
          const savedLemma = await lemmaCommandsGph.createOne(lemmaId, tx);
          assert.equal(savedLemma.id, lemmaId);

          await lemmaCommandsGph.deleteOne(savedLemma.id, tx);
          await tx.rollback();

          return fulfill();
        } catch (err) {
          assert.ifError(err);

          await tx.rollback();
          return reject(err);
        }
      }).then(done);
    })

    it('deletes non existing lemma silently', (done) => {
      const lemmaId = 1001;

      connector.inSession(async (session, fulfill, reject) => {
        const tx = session.beginTransaction();

        try {
          await lemmaCommandsGph.deleteOne(lemmaId, tx);
          await tx.rollback();

          return fulfill()
        } catch (err) {
          assert.ifError(err);

          await tx.rollback();
          return reject(err);
        }
      }).then(done);
    })
  });

  describe('#createRelationOne', () => {
    it ('creates relation for newly created lemma and existing sense', () => {
      const lemmaId = 1001;
      const senseId = 11;     // provided by graph seed
      const relationLabel = 'Sense';
      const nodeLabel = 'Sense';

      return connector.inSession(async (session, fulfill, reject) => {
        const tx = session.beginTransaction();

        try {
          const savedLemma = await lemmaCommandsGph.createOne(lemmaId, tx);
          const hasCreated = await lemmaCommandsGph
            .createRelationOne(savedLemma.id, relationLabel, senseId, nodeLabel, tx);
          await tx.rollback();

          assert.equal(hasCreated, true);
            
          return fulfill();
        } catch (err) {
          assert.ifError(err);

          await tx.rollback();
          return reject(err);
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

      return connector.inSession(async (session, fulfill, reject) => {
        const tx = session.beginTransaction();

        try {
          const savedLemma = await lemmaCommandsGph.createOne(lemmaId, tx);
          const hasCreated = await lemmaCommandsGph
            .createRelationOne(savedLemma.id, relationLabel, senseId, nodeLabel, tx);
            
          assert.equal(hasCreated, true);

          const hasDeleted = await lemmaCommandsGph
            .deleteRelationOne(savedLemma.id, relationLabel, senseId, nodeLabel, tx);

          assert.equal(hasDeleted, true);

          await tx.rollback();
          return fulfill();
        } catch (err) {
          assert.ifError(err);

          await tx.rollback();
          return reject(err);
        }
      });
    })
  });
})