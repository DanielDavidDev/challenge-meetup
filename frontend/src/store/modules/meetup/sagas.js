import { all, call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import {
  addMeetupSuccess,
  deleteMeetupSuccess,
  updateMeetupSuccess,
  meetupFailure,
} from './actions';

import api from '~/services/api';
import history from '~/services/history';

export function* addMeetup({ payload }) {
  try {
    const { data } = payload;
    const response = yield call(api.post, 'meetups', data);

    yield put(addMeetupSuccess(response.data));

    toast.success('Add Meetup with success!');

    history.push(`/meetups/${response.data.title}`);
  } catch (err) {
    toast.error('Add Meetup failure, verify your data.');
    yield put(meetupFailure());
  }
}

export function* updateMeetup({ payload }) {
  try {
    toast.success('Update Meetup with success!');
  } catch (err) {
    toast.error('Update Meetup failure, verify your data.');
    yield put(meetupFailure());
  }
}

export function* deleteMeetup() {
  try {
    toast.success('Update Meetup with success!');
  } catch (err) {
    toast.error('Update Meetup failure, verify your data.');
    yield put(meetupFailure());
  }
}

export default all([
  takeLatest('@meetup/ADD_MEETUP_REQUEST', addMeetup),
  takeLatest('@meetup/UPDATE_MEETUP_REQUEST', updateMeetup),
  takeLatest('@meetup/DELETE_MEETUP_REQUEST', deleteMeetup),
]);
