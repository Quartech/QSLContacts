
import 'mocha';
import supertest from 'supertest';
import app from './app';

describe('App', () => {
  it('works', () =>
    supertest(app)
      .get('/api/v1/')
      .expect('Content-Type', /json/)
      .expect(200)
  ).timeout(20000);

  it('health-check works', () =>
    supertest(app)
      .get('/api/v1/health/')
      .expect('Content-Type', /json/)
      .expect(200)
  );

  it('echo works', () =>
    supertest(app)
      .get('/api/v1/echo/foo')
      .expect('Content-Type', /json/)
      .expect(200)
  );

  // TODO: flesh out these tests
  // ...
});
