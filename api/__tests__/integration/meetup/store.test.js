import request from 'supertest';

import app from '../../../src/app';

import factory from '../../factory';
import truncate from '../../util/truncate';

describe('Meetup store', () => {
  beforeEach(async () => {
    await truncate();
  });

  xit('should be able register meetup', async () => {
    const user = await factory.create('User', {
      email: 'daniel.test1@test.com',
    });

    const {
      body: { token },
    } = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: user.password,
      });

    const {
      body: { id: banner_id },
    } = await request(app)
      .post('/files')
      .set('Authorization', `Bearer ${token}`)
      .type('application/x-www-form-urlencoded')
      .field('originalname', 'my awesome avatar')
      .field('filename', 'avatar')
      .attach('file', '__tests__/fixtures/profile.jpeg');

    const meetup = await factory.attrs('Meetup', {
      banner_id,
    });

    const response = await request(app)
      .post('/meetups')
      .set('Authorization', `Bearer ${token}`)
      .send(meetup);

    expect(response.body).toHaveProperty('id');
  });

  xit('should not permitted created meetup without fields setters', async () => {
    const user = await factory.create('User', {
      email: 'daniel.test2@test.com',
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
      .post('/meetups')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  xit('should not be able register meetup when the date have before from date actuality', async () => {
    const user = await factory.create('User', {
      email: 'daniel.test3@test.com',
    });

    const {
      body: { token },
    } = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: user.password,
      });
    const {
      body: { id: banner_id },
    } = await request(app)
      .post('/files')
      .set('Authorization', `Bearer ${token}`)
      .type('application/x-www-form-urlencoded')
      .field('originalname', 'my awesome banner')
      .field('filename', 'banner')
      .attach('file', '__tests__/fixtures/banner.jpeg');

    await factory.create('Meetup', {
      date: '2019-10-20T18:00:00-03:00',
      banner_id,
    });

    const meetup = await factory.attrs('Meetup', {
      date: '2019-10-20T18:00:00-03:00',
      banner_id,
    });

    const response = await request(app)
      .post('/meetups')
      .set('Authorization', `Bearer ${token}`)
      .send(meetup);

    expect(response.status).toBe(401);
  });
});
