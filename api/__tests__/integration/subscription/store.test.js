import request from 'supertest';

import app from '../../../src/app';

import factory from '../../factory';
import truncate from '../../util/truncate';

describe('Subscription store', () => {
  beforeEach(async () => {
    await truncate();
  });

  xit('should be able created a new subscription in meetup', async () => {
    const { email, password } = await factory.create('User');
    const owner = await factory.create('User');

    await request(app)
      .post('/sessions')
      .send({
        email,
        password,
      });

    const {
      body: { token },
    } = await request(app)
      .post('/sessions')
      .send({ email, password });

    const {
      body: { id: banner_id },
    } = await request(app)
      .post('/files')
      .set('Authorization', `Bearer ${token}`)
      .type('application/x-www-form-urlencoded')
      .field('originalname', 'my awesome avatar')
      .field('filename', 'avatar')
      .attach('file', '__tests__/fixtures/profile.jpeg');

    const meetup = await factory.create('Meetup', {
      banner_id,
      user_id: owner.id,
    });

    const response = await request(app)
      .post(`/meetups/${meetup.id}/subscriptions`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.body).toHaveProperty('id');
  });

  xit('should not be able without a meetup validate', async () => {
    const { email, password } = await factory.create('User');

    await request(app)
      .post('/sessions')
      .send({
        email,
        password,
      });

    const {
      body: { token },
    } = await request(app)
      .post('/sessions')
      .send({ email, password });

    const response = await request(app)
      .post('/meetups/0/subscriptions')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  xit('should not be able created a new subscription on the owner from meetup', async () => {
    const { email, password, id: user_id } = await factory.create('User');

    await request(app)
      .post('/sessions')
      .send({
        email,
        password,
      });

    const {
      body: { token },
    } = await request(app)
      .post('/sessions')
      .send({ email, password });

    const {
      body: { id: banner_id },
    } = await request(app)
      .post('/files')
      .set('Authorization', `Bearer ${token}`)
      .type('application/x-www-form-urlencoded')
      .field('originalname', 'my awesome avatar')
      .field('filename', 'avatar')
      .attach('file', '__tests__/fixtures/profile.jpeg');

    const meetup = await factory.create('Meetup', {
      banner_id,
      user_id,
    });

    const response = await request(app)
      .post(`/meetups/${meetup.id}/subscriptions`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
  });
});
