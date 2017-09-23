import * as assert from 'assert'
import Fetch from 'node-fetch';

import HttpTestHelper from 'src/Test/Util/HttpTestHelper';

describe('HelloController', () => {
  it('GET /hello', async () => {
    const res = await Fetch(HttpTestHelper.ResolveDomain('/hello'))
    const resBody = await res.json();

    assert.deepEqual(resBody, {
      data: {
        message: 'Hello world'
      }
    });
  });
})