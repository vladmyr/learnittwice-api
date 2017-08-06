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
          .createOne({ lemma }, t)
          .then((savedLemma) => {
            assert.equal(typeof savedLemma.id, 'number');
            assert.equal(savedLemma.lemma, lemma);
            
            return Postgres.Rollback();
          })
      }));
    });
  });

  describe('#createMany', () => {
    it ('creates multiple new lemmas', () => {
      const lemmas = [
        { lemma: 'lemma901' }, { lemma: 'lemma902' }, { lemma: 'lemma903' }, { lemma: 'lemma904' }, { lemma: 'lemma905' }, { lemma: 'lemma906' }, 
        { lemma: 'lemma907' }, { lemma: 'lemma908' }, { lemma: 'lemma909' }, { lemma: 'lemma910' }, { lemma: 'lemma911' }, { lemma: 'lemma912' }, 
        { lemma: 'lemma913' }, { lemma: 'lemma914' }, { lemma: 'lemma915' }, { lemma: 'lemma916' }, { lemma: 'lemma917' }, { lemma: 'lemma918' }, 
        { lemma: 'lemma919' }, { lemma: 'lemma920' }, { lemma: 'lemma921' }, { lemma: 'lemma922' }, { lemma: 'lemma923' }, { lemma: 'lemma924' }, 
        { lemma: 'lemma925' }, { lemma: 'lemma926' }, { lemma: 'lemma927' }, { lemma: 'lemma928' }, { lemma: 'lemma929' }, { lemma: 'lemma930' }, 
        { lemma: 'lemma931' }, { lemma: 'lemma932' }, { lemma: 'lemma933' }, { lemma: 'lemma934' }, { lemma: 'lemma935' }, { lemma: 'lemma936' }, 
        { lemma: 'lemma937' }, { lemma: 'lemma938' }, { lemma: 'lemma939' }, { lemma: 'lemma940' }, { lemma: 'lemma941' }, { lemma: 'lemma942' }, 
        { lemma: 'lemma943' }, { lemma: 'lemma944' }, { lemma: 'lemma945' }, { lemma: 'lemma946' }, { lemma: 'lemma947' }, { lemma: 'lemma948' }, 
        { lemma: 'lemma949' }, { lemma: 'lemma950' }, { lemma: 'lemma951' }, { lemma: 'lemma952' }, { lemma: 'lemma953' }, { lemma: 'lemma954' }, 
        { lemma: 'lemma955' }, { lemma: 'lemma956' }, { lemma: 'lemma957' }, { lemma: 'lemma958' }, { lemma: 'lemma959' }, { lemma: 'lemma960' }, 
        { lemma: 'lemma961' }, { lemma: 'lemma962' }, { lemma: 'lemma963' }, { lemma: 'lemma964' }, { lemma: 'lemma965' }, { lemma: 'lemma966' }, 
        { lemma: 'lemma967' }, { lemma: 'lemma968' }
      ];

      return Postgres.ResolveTest(db.tx((t) => {
        return lemmaCommands
          .createMany(lemmas, t)
          .then((savedLemmas) => {
            assert.equal(savedLemmas.length, lemmas.length);

            return Postgres.Rollback();
          })
      }))
    })
  })

  describe('#updateOne', () => {
    it ('updates existing lemma', () => {
      const expectedLemma = {
        id: 1,
        lemma: 'lemma101'
      }

      return Postgres.ResolveTest(db.tx((t) => {
        return lemmaCommands
          .updateOne(expectedLemma.id, { lemma: expectedLemma.lemma }, t)
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
          .updateOne(expectedLemma.id, { lemma: expectedLemma.lemma }, t)
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