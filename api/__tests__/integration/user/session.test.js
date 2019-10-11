import request from 'supertest';

import app from '../../../src/app';

import factory from '../../factory';
import truncate from '../../util/truncate';

describe('Session store', () => {
  beforeEach(async () => {
    await truncate();
  });

  xit('should be able session', async () => {
    const { email, password } = await factory.create('User');

    const response = await request(app)
      .post('/sessions')
      .send({
        email,
        password,
      });

    expect(response.body).toHaveProperty('token');
  });

  xit('should not be able schema validators', async () => {
    await factory.create('User');

    const response = await request(app)
      .post('/sessions')
      .send({
        email: '',
        password: '',
      });

    expect(response.status).toBe(400);
  });

  xit('should not be able with email invalid', async () => {
    const user = await factory.create('User', {
      email: 'daniel@test.com',
    });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'daniel1@test.com',
        password: user.password,
      });

    expect(response.status).toBe(401);
  });

  xit('should not be able without oldPassword validate', async () => {
    const user = await factory.create('User', {
      password: '123456',
    });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123123',
      });

    expect(response.status).toBe(401);
  });
});
