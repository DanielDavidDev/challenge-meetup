import request from 'supertest';

import app from '../../../src/app';

import factory from '../../factory';
import truncate from '../../util/truncate';

describe('Subscription index', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able list the subscribers from meetup', async () => {
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

    await request(app)
      .post(`/meetups/${meetup.id}/subscriptions`)
      .set('Authorization', `Bearer ${token}`);

    const response = await request(app)
      .get(`/meetups/${meetup.id}/subscriptions`)
      .set('Authorization', `Bearer ${token}`);

    console.log(response);

    expect(response.body[0].id).toEqual(response.body[0].id, 1);
  });
});
