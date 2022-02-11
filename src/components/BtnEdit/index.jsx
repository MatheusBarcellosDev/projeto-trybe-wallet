import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { AiOutlineEdit } from 'react-icons/ai';
import { editExpenses } from '../../actions/index';

function BtnEdtit({ id, editExpense, toEdit }) {
  return (
    <button
      type="button"
      className="btn btn-primary"
      onClick={ () => editExpense(id) }
      data-testid="edit-btn"
      disabled={ toEdit }
    >
      <AiOutlineEdit />
    </button>
  );
}

const mapDispatchToProps = (dispatch) => ({
  editExpense: (id) => dispatch(editExpenses(id)),
});

const mapStateToProps = (state) => ({
  toEdit: state.wallet.toEdit,
});

BtnEdtit.propTypes = {
  id: PropTypes.number.isRequired,
  editExpense: PropTypes.func.isRequired,
  toEdit: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(BtnEdtit);
