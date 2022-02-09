import { DATA_USER, ADD_EXPENSES } from './actionTypes';

export function updateDataUser(payload) {
  return {
    type: DATA_USER,
    payload,
  };
}

export function addExpenses(payload) {
  return {
    type: ADD_EXPENSES,
    payload,
  };
}
