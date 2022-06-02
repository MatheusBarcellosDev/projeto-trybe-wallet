import { DATA_USER } from '../actions/actionTypes';

const INITIAL_STATE = {
  email: '',
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case DATA_USER:
    return {
      ...state,
      ...action.payload,
    };
  default:
    return state;
  }
}
