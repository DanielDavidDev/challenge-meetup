import request from 'supertest';
import bcrypt from 'bcryptjs';

import app from '../../../src/app';

import factory from '../../factory';
import truncate from '../../util/truncate';

describe('User store', () => {
  beforeEach(async () => {
    await truncate();
  });

  xit('should be able register', async () => {
    const user = await factory.attrs('User');

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.body).toHaveProperty('id');
  });

  xit('should encrypt user password when new user created', async () => {
    const user = await factory.create('User', {
      password: '123456',
    });

    const compareHash = await bcrypt.compare('123456', user.password_hash);

    expect(compareHash).toBe(true);
  });

  xit('should not encrypt user password when new user created', async () => {
    const user = await factory.create('User', {
      password: '123456',
    });

    const compareHash = await bcrypt.compare('1234567', user.password_hash);

    expect(compareHash).toBe(false);
  });

  xit('should not be able register with duplicated email', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(user);

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.status).toBe(400);
  });

  xit('should not be able register without fields', async () => {
    const response = await request(app).post('/users');

    expect(response.status).toBe(400);
  });
});
