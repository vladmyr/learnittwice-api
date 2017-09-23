import * as assert from 'assert'
import Fetch from 'node-fetch';

import HttpTestHelper from 'src/Test/Util/HttpTestHelper';

describe('CustomPropertyController', () => {
  it('GET existing record', async () => {
    const res = await Fetch(HttpTestHelper.ResolveDomain('/custom_properties/2'))
    const resBody = await res.json();

    assert.deepEqual(resBody, {
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

  it('GET not-existing record', async () => {
    const res = await Fetch(HttpTestHelper.ResolveDomain('/custom_properties/1001'))
    const resBody = await res.text();

    assert.equal(res.status, 404);
    assert.equal(resBody, '');
  })

  it('POST creates are record', async () => {
    const payload = {
      knowledgeUnitId: 1,
      propertyRelationId: 1,
      dataType: "string",
      name: "string",
      value: "string"
    }
  })

  it('POST responds 400 for incorrect payload #1', async () => {

  })
});