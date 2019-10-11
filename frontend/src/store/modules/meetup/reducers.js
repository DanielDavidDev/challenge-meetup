import produce from 'immer';

const INITIAL_STATE = {
  meetup: null,
};

export default function meetup(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@meetup/ADD_MEETUP_SUCCESS': {
        draft.meetup = action.payload.data;
        break;
      }
      case '@meetup/UPDATE_MEETUP_SUCCESS': {
        draft.meetup = action.payload.data;
        break;
      }
      case '@meetup/DELETE_MEETUP_SUCCESS': {
        draft.meetup = null;
        break;
      }
      default:
    }
  });
}
