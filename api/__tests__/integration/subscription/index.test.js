import request from 'supertest';

import app from '../../../src/app';

import factory from '../../factory';
import truncate from '../../util/truncate';

describe('Subscription index', () => {
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
});
