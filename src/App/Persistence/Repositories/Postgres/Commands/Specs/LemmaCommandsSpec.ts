import * as assert from 'assert';
import { errors } from 'pg-promise';

import { Postgres } from 'src/Test/Util/Mocha';
import LemmaCommands from '../LemmaCommands';

const lemmaCommands = LemmaCommands.GetInstance();
const db = lemmaCommands.getDb();

describe('LemmaCommands', () => {
  describe('#createOne', () => {
    it ('creates new lemma', () => {
      const lemma = 'lemma101';
      return Postgres.ResolveTest(db.tx((t) => {
        return lemmaCommands
          .createOne(lemma, t)
          .then((savedLemma) => {
            assert.equal(typeof savedLemma.id, 'number');
            assert.equal(savedLemma.lemma, lemma);
            
            return Postgres.Rollback();
          })
      }));
    });
  });

  describe('#updateOne', () => {
    it ('updates existing lemma', () => {
      const expectedLemma = {
        id: 1,
        lemma: 'lemma101'
      }

      return Postgres.ResolveTest(db.tx((t) => {
        return lemmaCommands
          .updateOne(expectedLemma.id, expectedLemma.lemma, t)
          .then((updatedLemma) => {
            assert.deepEqual(updatedLemma, expectedLemma);

            return Postgres.Rollback();
          })
      }));
    })

    it ('raises a QueryResultError on updating non-existing lemma', () => {
      const expectedLemma = {
        id: 0,
        lemma: 'lemma101'
      }

      return db.tx((t) => {
        return lemmaCommands
          .updateOne(expectedLemma.id, expectedLemma.lemma, t)
      })
      .catch((err) => {
        assert.equal(err.code, errors.queryResultErrorCode.noData);
      });
    })
  });

  describe('#deleteOne', () => {
    it ('deletes existing lemma', () => {
      const lemmaId = 1;

      return Postgres.ResolveTest(db.tx((t) => {
        return lemmaCommands
          .deleteOne(lemmaId, t)
          .then((data) => {
            assert.equal(data, null);

            return Postgres.Rollback();
          })
      }));
    })
  })
})