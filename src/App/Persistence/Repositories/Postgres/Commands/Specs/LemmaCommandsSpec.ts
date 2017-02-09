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

  describe('#createMany', () => {
    it ('creates multile nex lemmas', () => {
      const lemmas = [
        'lemma901', 'lemma902', 'lemma903', 'lemma904', 'lemma905', 'lemma906', 
        'lemma907', 'lemma908', 'lemma909', 'lemma910', 'lemma911', 'lemma912', 
        'lemma913', 'lemma914', 'lemma915', 'lemma916', 'lemma917', 'lemma918', 
        'lemma919', 'lemma920', 'lemma921', 'lemma922', 'lemma923', 'lemma924', 
        'lemma925', 'lemma926', 'lemma927', 'lemma928', 'lemma929', 'lemma930', 
        'lemma931', 'lemma932', 'lemma933', 'lemma934', 'lemma935', 'lemma936', 
        'lemma937', 'lemma938', 'lemma939', 'lemma940', 'lemma941', 'lemma942', 
        'lemma943', 'lemma944', 'lemma945', 'lemma946', 'lemma947', 'lemma948', 
        'lemma949', 'lemma950', 'lemma951', 'lemma952', 'lemma953', 'lemma954', 
        'lemma955', 'lemma956', 'lemma957', 'lemma958', 'lemma959', 'lemma960', 
        'lemma961', 'lemma962', 'lemma963', 'lemma964', 'lemma965', 'lemma966', 
        'lemma967', 'lemma968'
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