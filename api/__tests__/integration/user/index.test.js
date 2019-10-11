import request from 'supertest';

import app from '../../../src/app';

import factory from '../../factory';
import truncate from '../../util/truncate';

describe('User store', () => {
  beforeEach(async () => {
    await truncate();
  });

  xit('should be able list providers', async () => {
    const user = await factory.create('User');

    const {
      body: { token },
    } = await request(app)
      .post('/sessions')
      .send({ email: user.email, password: user.password });

    const response = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${token}`);

    expect(response.body[0].id).toEqual(response.body[0].id, user.id);
  });

  xit('should not be able without authorization not found', async () => {
    const response = await request(app).get('/users');

    expect(response.status).toBe(401);
  });

  xit('should not be able without authorization invalidate', async () => {
    const response = await request(app)
      .get('/users')
      .set('Authorization', 'Bearer 123');

    expect(response.status).toBe(401);
  });
});
