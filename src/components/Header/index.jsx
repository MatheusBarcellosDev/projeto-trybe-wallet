import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropiTypes from 'prop-types';
import trybeWallet from './assets/image/logoTrybeHeader.png';
import './style.css';
import BtnLoggof from '../BtnLogoff';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };

    this.updadeState = this.updadeState.bind(this);
    this.deleteLocalStorage = this.deleteLocalStorage.bind(this);
    this.saveLocalStorage = this.saveLocalStorage.bind(this);
  }

  componentDidMount() {
    const getEmail = this.getLocalStorage();
    if (getEmail) {
      this.updadeState(getEmail);
    } else {
      const { email } = this.props;
      this.updadeState(email);
      this.saveLocalStorage(email);
    }
  }

  getLocalStorage() {
    const email = localStorage.getItem('email');
    return email;
  }

  updadeState(email) {
    this.setState({ email });
  }

  deleteLocalStorage() {
    localStorage.removeItem('email');
  }

  saveLocalStorage(email) {
    localStorage.setItem('email', email);
  }

  render() {
    const { email } = this.state;
    const { expenses } = this.props;
    const totalExpenses = expenses.reduce((acc, curr) => {
      acc += curr.value * curr.exchangeRates[curr.currency].ask;
      return acc;
    }, 0);
    const formatTotalExpenses = Number(totalExpenses.toFixed(2));

    console.log(email);
    return (
      <header className="header container-fluid">
        <div className="header__logo">
          <img src={ trybeWallet } alt="logo" className="img-fluid" />
        </div>
        <div className="header__email__user">
          <span data-testid="email-field">
            {' '}
            {email}
            {' '}
          </span>
        </div>
        <div className="header__currency" data-testid="total-field">
          <span
            data-testid="header-currency-field"
          >
            {`Total: ${formatTotalExpenses} BRL`}
          </span>
        </div>
        <div className="header__btn__logoff">
          <BtnLoggof />
        </div>

      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropiTypes.string.isRequired,
  expenses: PropiTypes.arrayOf(PropiTypes.object).isRequired,
  history: PropiTypes.shape({
    push: PropiTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Header);
