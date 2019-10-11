import request from 'supertest';

import app from '../../../src/app';

import factory from '../../factory';
import truncate from '../../util/truncate';

describe('File store', () => {
  beforeEach(async () => {
    await truncate();
  });

  xit('should be able update user to file', async () => {
    const user = await factory.create('User');

    const {
      body: { token },
    } = await request(app)
      .post('/sessions')
      .send({ email: user.email, password: user.password });

    const response = await request(app)
      .post('/files')
      .set('Authorization', `Bearer ${token}`)
      .type('application/x-www-form-urlencoded')
      .field('originalname', 'my awesome avatar')
      .field('filename', 'avatar')
      .attach('file', '__tests__/fixtures/profile.jpeg');

    expect(response.body).toHaveProperty('id');
  });

  xit('should not be able without authorization not found', async () => {
    const response = await request(app).post('/files');

    expect(response.status).toBe(401);
  });

  xit('should not be able without authorization invalidate', async () => {
    const response = await request(app)
      .post('/files')
      .set('Authorization', 'Bearer 123');

    expect(response.status).toBe(401);
  });
});
