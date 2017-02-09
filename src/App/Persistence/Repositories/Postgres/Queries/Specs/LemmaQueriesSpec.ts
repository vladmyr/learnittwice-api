import * as assert from 'assert';

import LemmaQueries from '../LemmaQueries';

describe('LemmaQueries', () => {
  describe('#findOne', () => {
    it ('returns single existing lemma', () => {
      const expectedLemma = {
        id: 1,
        lemma: 'lemma001'
      }

      return LemmaQueries.GetInstance()
        .findOne(expectedLemma.id)
        .then((lemma) => {
          assert.deepEqual(expectedLemma, lemma);
        });
    });

    it ('returns null for non-existing lemma', () => {
      return LemmaQueries.GetInstance()
        .findOne(-1)
        .then((lemma) => {
          assert.equal(lemma, null);
        })
    });
  })

  describe('#findOneByLemma', () => {
    it ('returns single existing lemma', () => {
      const expectedLemma = {
        id: 1,
        lemma: 'lemma001'
      }

      return LemmaQueries.GetInstance()
        .findOneByLemma(expectedLemma.lemma)
        .then((lemma) => {
          assert.deepEqual(lemma, expectedLemma);
        });
    });

    it ('returns null for non-existing lemma', () => {
      return LemmaQueries.GetInstance()
        .findOneByLemma('very-dummy-non-existing-lemma')
        .then((lemma) => {
          assert.deepEqual(lemma, null);
        });
    });
  })

  describe('#findMany', () => {
    it ('returns single existing lemma', () => {
      const expectedLemma = {
        id: 1,
        lemma: 'lemma001'
      }

      return LemmaQueries.GetInstance()
        .findMany([expectedLemma.id])
        .then((arrLemma) => {
          assert.equal(arrLemma.length, 1);
          assert.deepEqual(arrLemma[0], expectedLemma);
        });
    });

    it ('returns multiple existing lemma', () => {
      const expectedLemmas = [{
        id: 2,
        lemma: 'lemma002'
      }, {
        id: 3,
        lemma: 'lemma003'
      }];

      return LemmaQueries.GetInstance()
        .findMany([expectedLemmas[0].id, expectedLemmas[1].id])
        .then((arrLemmas) => {
          assert.equal(arrLemmas.length, 2);
          assert.deepEqual(expectedLemmas, arrLemmas);
        })
    });

    it ('returns empty arry for multiple non-existing lemmas', () => {
      return LemmaQueries.GetInstance()
        .findMany([-1, -2, 999999])
        .then((arrLemma) => {
          assert.equal(Array.isArray(arrLemma), true);
          assert.equal(arrLemma.length, 0);
        })
    });
  })
})