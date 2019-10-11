export function addMeetupRequest(data) {
  return {
    type: '@meetup/ADD_MEETUP_REQUEST',
    payload: { data },
  };
}

export function updateMeetupRequest(data) {
  return {
    type: '@meetup/UPDATE_MEETUP_REQUEST',
    payload: { data },
  };
}

export function deleteMeetupRequest(id) {
  return {
    type: '@meetup/DELETE_MEETUP_REQUEST',
    payload: { id },
  };
}

export function addMeetupSuccess(data) {
  return {
    type: '@meetup/ADD_MEETUP_SUCCESS',
    payload: { data },
  };
}

export function updateMeetupSuccess(data) {
  return {
    type: '@meetup/UPDATE_MEETUP_SUCCESS',
    payload: { data },
  };
}

export function deleteMeetupSuccess() {
  return {
    type: '@meetup/DELETE_MEETUP_SUCCESS',
  };
}

export function meetupFailure() {
  return {
    type: '@meetup/MEETUP_FAILURE',
  };
}
