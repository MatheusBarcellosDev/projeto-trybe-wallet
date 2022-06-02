import { ADD_EXPENSES,
  EDIT_EXPENSES,
  DELETE_EXPENSES,
  ADD_EXPENSES_EDIT } from '../actions/actionTypes';

const INITIAL_STATE = {
  expenses: [],
  editExpenses: {},
  localStorage: [],
  toEdit: false,
};

export default function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        action.payload,
      ],
    };

  case EDIT_EXPENSES:
    return {
      ...state,
      editExpenses: state.expenses.find((expense) => expense.id === action.id),
      toEdit: true,
    };
  case ADD_EXPENSES_EDIT:
    return {
      ...state,
      expenses: state.expenses.map((expense) => {
        if (expense.id === state.editExpenses.id) {
          return {
            ...action.payload,
            exchangeRates: expense.exchangeRates,
            id: expense.id,
          };
        }
        return expense;
      }),
      toEdit: false,
    };
  case DELETE_EXPENSES:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.id),
    };
  default:
    return state;
  }
}
