import { combineReducers } from 'redux';

import auth from './auth/reducers';
import user from './user/reducers';
import meetup from './meetup/reducers';

export default combineReducers({
  auth,
  user,
  meetup,
});
