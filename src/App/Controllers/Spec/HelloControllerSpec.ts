import * as assert from 'assert'
import Fetch from 'node-fetch';

import HttpTestHelper from 'src/Test/Util/HttpTestHelper';

describe('HelloController', () => {
  it('# GET /hello', async () => {
    const res = await Fetch(HttpTestHelper.ResolveDomain('/hello'))
      .then(res => res.json());

    assert.deepEqual(res, {
      data: {
        message: 'Hello world'
      }
    });

  });
})