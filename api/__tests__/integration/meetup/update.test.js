import request from 'supertest';

import { subHours } from 'date-fns';
import app from '../../../src/app';

import factory from '../../factory';
import truncate from '../../util/truncate';

describe('Meetup update', () => {
  beforeEach(async () => {
    await truncate();
  });

  xit('should be able update a meetup', async () => {
    const { email, password } = await factory.create('User');

    const {
      body: { token },
    } = await request(app)
      .post('/sessions')
      .send({
        email,
        password,
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
      .put(`/meetups/${meetupRes.body.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.body).toHaveProperty('id');
  });

  xit('should not be able update a meetup without banner_id', async () => {
    const { email, password } = await factory.create('User');

    const {
      body: { token },
    } = await request(app)
      .post('/sessions')
      .send({
        email,
        password,
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
      .put(`/meetups/${meetupRes.body.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        date: '2019-10-24T10:00:00-03:00',
        banner_id: 2,
      });

    expect(response.status).toBe(400);
  });

  xit('should not be able update a meetup with date before of 2 hours to realiasetion from event', async () => {
    const { email, password } = await factory.create('User');

    const {
      body: { token },
    } = await request(app)
      .post('/sessions')
      .send({
        email,
        password,
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
      date: `${subHours(Date.now(), 2)}`,
      banner_id,
    });

    const meetupRes = await request(app)
      .post('/meetups')
      .set('Authorization', `Bearer ${token}`)
      .send(meetup);

    const response = await request(app)
      .put(`/meetups/${meetupRes.body.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'title',
        description: 'show aprendendo um bocado com node.js',
      });

    expect(response.status).toBe(400);
  });
});
