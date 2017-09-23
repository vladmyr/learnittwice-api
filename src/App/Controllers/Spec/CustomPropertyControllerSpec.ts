import * as assert from 'assert'
import Fetch from 'node-fetch';

import HttpTestHelper from 'src/Test/Util/HttpTestHelper';

describe('CustomPropertyController', () => {
  it('# GET /custom_properties/2', async () => {
    const res = await Fetch(HttpTestHelper.ResolveDomain('/custom_properties/2'))
      .then(res => res.json());

    assert.deepEqual(res, {
      data: {
        id: 2,
        knowledgeUnitId: 1,
        propertyRelationId: 1,
        dataType: 'string',
        name: 'Question',
        slug: 'question',
        value: 'What is the height of mount Evenest?'
      }
    });

  });
});