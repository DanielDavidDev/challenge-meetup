import request from 'supertest';

import app from '../../../src/app';

import factory from '../../factory';
import truncate from '../../util/truncate';

describe('Meetup show', () => {
  beforeEach(async () => {
    await truncate();
  });

  xit('should be able view data of a meetup', async () => {
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
      .field('originalname', 'my awesome banner')
      .field('filename', 'banner')
      .attach('file', '__tests__/fixtures/banner.jpeg');

    const meetup = await factory.attrs('Meetup', {
      banner_id,
    });

    const meetupRes = await request(app)
      .post('/meetups')
      .set('Authorization', `Bearer ${token}`)
      .send(meetup);

    const response = await request(app)
      .get(`/meetups/${meetupRes.body.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.body).toHaveProperty('id');
  });

  xit('should not be able view data of a meetup', async () => {
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
      .get('/meetups/0')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
  });
});
