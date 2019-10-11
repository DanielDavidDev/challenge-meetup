import { factory } from 'factory-girl';
import faker from 'faker';

import User from '../src/app/models/User';
import Meetup from '../src/app/models/Meetup';

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

factory.define('Meetup', Meetup, {
  title: 'React',
  description: 'Tudo sobre o React',
  location: 'Areia, Paraíba, Brasil',
  date: '2019-10-20T18:00:00-03:00',
  banner_id: 1,
});

export default factory;
