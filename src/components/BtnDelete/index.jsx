import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FiTrash } from 'react-icons/fi';
import { deleteExpenses } from '../../actions/index';

function BtnDelete({ id, deleteExpense, toEdit }) {
  return (
    <button
      type="button"
      data-testid="delete-btn"
      className="btn btn-danger"
      onClick={ () => deleteExpense(id) }
      disabled={ toEdit }
    >
      <FiTrash />
    </button>
  );
}

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (id) => dispatch(deleteExpenses(id)),
});

const mapStateToProps = (state) => ({
  toEdit: state.wallet.toEdit,
});

BtnDelete.propTypes = {
  id: PropTypes.number.isRequired,
  deleteExpense: PropTypes.func.isRequired,
  toEdit: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(BtnDelete);
