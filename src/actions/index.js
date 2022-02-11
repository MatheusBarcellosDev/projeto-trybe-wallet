import { DATA_USER,
  ADD_EXPENSES,
  EDIT_EXPENSES,
  DELETE_EXPENSES,
  ADD_EXPENSES_EDIT } from './actionTypes';

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

export function editExpenses(id) {
  return {
    type: EDIT_EXPENSES,
    id,
  };
}

export function addExpenseseEdit(payload) {
  return {
    type: ADD_EXPENSES_EDIT,
    payload,
  };
}

export function deleteExpenses(id) {
  return {
    type: DELETE_EXPENSES,
    id,
  };
}
