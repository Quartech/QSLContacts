import supertest from 'supertest'
import mocha from 'mocha';
import { expect } from 'chai';
import app from './app'

describe('App', () => {
  it('works', () =>
    expect('foo').to.equal('foo')
    // TODO: flesh out the tests
    // ...
    // supertest(app)
    //   .get('/')
    //   .expect('Content-Type', /json/)
    //   .expect(200)
  );
});
