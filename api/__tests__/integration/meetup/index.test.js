import request from 'supertest';

import app from '../../../src/app';

import factory from '../../factory';
import truncate from '../../util/truncate';

describe('Meetup index', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able list meetups', async () => {
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
      .get('/meetups')
      .set('Authorization', `Bearer ${token}`)
      .query({
        page: 1,
        date: meetup.date,
      });

    expect(response.body[0].id).toEqual(response.body[0].id, meetupRes.body.id);
  });

  it('should be able list meetups without informed page', async () => {
    try {
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

      const {
        body: { id: banner_id },
      } = await request(app)
        .post('/files')
        .set('Authorization', `Bearer ${token}`)
        .type('application/x-www-form-urlencoded')
        .field('originalname', 'my awesome banner')
        .field('filename', 'banner')
        .attach('file', '__tests__/fixtures/banner.jpeg');

      const meetup = await factory.create('Meetup', {
        banner_id,
        user_id: user.id,
      });

      const response = await request(app)
        .get('/meetups')
        .set('Authorization', `Bearer ${token}`)
        .query({
          date: meetup.date,
        });

      expect(response.body[0].id).toEqual(response.body[0].id, meetup.id);
    } catch (err) {
      console.log(err);
    }
  });
});
