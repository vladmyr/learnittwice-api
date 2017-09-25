import * as assert from 'assert'
import * as _ from 'lodash';
import Fetch from 'node-fetch';

import Postgres from 'src/App/Domain/Helpers/Modules/Postgres';
import HttpTestHelper from 'src/Test/Util/HttpTestHelper';

describe('CustomPropertyController', function() {
  this.timeout(0);

  const postRequestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }

  describe('/custom_properties', () => {
    const payload = {
      knowledgeUnitId: 1,
      propertyRelationId: 1,
      dataType: 'string',
      name: 'name001',
      value: 'value001'
    }

    describe('POST', () => {
      it('201 for creating a record', async () => {
        const res = await Fetch(
          HttpTestHelper.ResolveDomain('/custom_properties'), 
          _.extend({
            body: JSON.stringify(payload)
          }, postRequestOptions)
        );
        const resBody = await res.json();

        assert.equal(res.status, 201);
        assert.equal(typeof resBody.data.id, 'number');
      })

      it('400 for invalid payload', async () => {
        const res = await Fetch(
          HttpTestHelper.ResolveDomain('/custom_properties'), 
          _.extend({
            body: JSON.stringify(_.omit(payload, 'knowledgeUnitId'))
          }, postRequestOptions)
        );

        assert.equal(res.status, 400);
      })
    })
  })

  describe('/custom_properties/:id', () => {
    describe('GET', () => {
      it('200 for existing record', async () => {
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
    
      it('404 for not-existing record', async () => {
        const res = await Fetch(HttpTestHelper.ResolveDomain('/custom_properties/1001'))
        const resBody = await res.text();
    
        assert.equal(res.status, 404);
        assert.equal(resBody, '');
      })
    })

    describe('POST', () => {
      const payload = {
        knowledgeUnitId: 1,
        propertyRelationId: 1,
        dataType: 'string',
        name: 'name002',
        value: 'value002'
      }

      it('201 on record update', async () => {
        const res = await Fetch(
          HttpTestHelper.ResolveDomain('/custom_properties/1'), 
          _.extend({
            body: JSON.stringify(payload)
          }, postRequestOptions)
        );
        const resBody = await res.json();

        assert.equal(res.status, 201);
        assert.equal(typeof resBody.data.id, 'number');
        assert.deepEqual(_.omit(resBody.data, 'id', 'slug'), payload);
      })

      it('400 on invalid payload', async () => {
        const res = await Fetch(
          HttpTestHelper.ResolveDomain('/custom_properties/1'),
          _.extend({
            body: JSON.stringify(_.omit(payload, 'dataType'))
          }, postRequestOptions)
        )
        const resBody = await res.json();

        assert.equal(res.status, 400);
        assert.notEqual(typeof resBody.error, 'undefined');
        assert.equal(typeof resBody.error.code, 'number');
        assert.equal(typeof resBody.error.message, 'string');
      })
    })

    describe('DELETE', () => {
      it('204 for existing record', async () => {
        return Postgres.DryRun(async () => {
          const res = await Fetch(
            HttpTestHelper.ResolveDomain('/custom_properties/1'),
            { method: 'DELETE' }
          )
          const resBody = await res.text();
  
          assert.equal(res.status, 204);
          assert.equal(resBody, '');
        })
      })

      it('204 for not-existing record', async () => {
        const res = await Fetch(
          HttpTestHelper.ResolveDomain('/custom_properties/1002'),
          { method: 'DELETE' }
        )
        const resBody = await res.text();

        assert.equal(res.status, 204);
        assert.equal(resBody, '');
      })
    })
  })
});