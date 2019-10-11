import request from 'supertest';

import app from '../../../src/app';

import factory from '../../factory';
import truncate from '../../util/truncate';

describe('User update', () => {
  beforeEach(async () => {
    await truncate();
  });

  xit('should be able update user', async () => {
    const user = await factory.create('User');

    const {
      body: { token },
    } = await request(app)
      .post('/sessions')
      .send({ email: user.email, password: user.password });

    const response = await request(app)
      .put('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: user.name,
        email: user.email,
        oldPassword: user.password,
        password: '123123',
        confirmPassword: '123123',
      });

    expect(response.body).toHaveProperty('id');
  });

  xit('should not be able update with verify of duplicated email', async () => {
    const user = await factory.create('User', {
      email: 'daniel1@test.com',
    });

    const userTwo = await factory.create('User');

    const {
      body: { token },
    } = await request(app)
      .post('/sessions')
      .send({
        email: userTwo.email,
        password: userTwo.password,
      });

    const response = await request(app)
      .put('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: user.email,
        oldPassword: userTwo.password,
        password: '123123',
        confirmPassword: '123123',
      });

    expect(response.status).toBe(400);
  });

  xit('should not be able with oldPassword error', async () => {
    const user = await factory.create('User', {
      password: '123456',
    });

    const {
      body: { token },
    } = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: user.password,
      });

    const response = await request(app)
      .put('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: user.email,
        oldPassword: '123567',
        password: '123123',
        confirmPassword: '123123',
      });

    expect(response.status).toBe(401);
  });

  xit('should not be able validate without fields', async () => {
    const user = await factory.create('User', {
      email: 'daniel1@test.com',
      password: '123456',
    });

    const {
      body: { token },
    } = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: user.password,
      });

    const response = await request(app)
      .put('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: user.email,
        oldPassword: '',
        password: '',
        confirmPassword: '',
      });

    expect(response.status).toBe(400);
  });

  xit('should not be able without authorization not found', async () => {
    const response = await request(app).put('/users');

    expect(response.status).toBe(401);
  });

  xit('should not be able without authorization invalidate', async () => {
    const response = await request(app)
      .put('/users')
      .set('Authorization', 'Bearer 123');

    expect(response.status).toBe(401);
  });
});
