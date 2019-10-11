import request from 'supertest';
import { subHours } from 'date-fns';

import app from '../../../src/app';

import factory from '../../factory';
import truncate from '../../util/truncate';

describe('Meetup destroy', () => {
  beforeEach(async () => {
    await truncate();
  });

  xit('should be able detete a meetup', async () => {
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
      .delete(`/meetups/${meetupRes.body.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  xit('should not be able detete a meetup not found', async () => {
    const { email, password } = await factory.create('User');

    const {
      body: { token },
    } = await request(app)
      .post('/sessions')
      .send({
        email,
        password,
      });

    const response = await request(app)
      .delete(`/meetups/0`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
  });

  it('should not be able detete a meetup what is 2 hours before from event', async () => {
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
      .delete(`/meetups/${meetupRes.body.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(401);
  });
});
