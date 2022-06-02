import React from 'react';
import './style.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import trybeWallet from './assets/image/trybeWallet.png';
import { validatePassword, validationEmail } from '../../utils/validations';
import { updateDataUser } from '../../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: '',
        password: '',
      },
      valideEmail: '',
      validePassword: '',
      btnLogin: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.validation = this.validation.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validation() {
    const { user } = this.state;
    const { email, password } = user;
    if (!validationEmail(email)) {
      this.setState({ valideEmail: 'Email inválido' });
    } else {
      this.setState({ valideEmail: 'Email válido' });
    }
    if (!validatePassword(password)) {
      this.setState({ validePassword: 'Senha inválida' });
    } else {
      this.setState({ validePassword: 'Senha válida' });
    }
    if (validationEmail(email) && validatePassword(password)) {
      this.setState({ btnLogin: false });
    } else {
      this.setState({ btnLogin: true });
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { user } = this.state;
    this.validation();
    this.setState({ user: { ...user, [name]: value } });
  }

  handleSubmit(event) {
    const { history, login } = this.props;
    const { user } = this.state;
    const { email, password } = user;
    event.preventDefault();
    login({ email });
    if (email && password) {
      history.push('/carteira');
    }
  }

  render() {
    const { valideEmail, validePassword, user, btnLogin } = this.state;
    const { email, password } = user;
    return (
      <div className="container center">
        <div className="container__login">
          <div className="container__login__logo">
            <img className="img-fluid" src={ trybeWallet } alt="logo" />
          </div>
          <div className="container__login__form">
            <form>
              <input
                data-testid="email-input"
                className="form-control"
                placeholder="Digite seu email"
                onChange={ this.handleChange }
                name="email"
                value={ email }
                autoComplete="off"
              />
              {valideEmail === 'Email inválido' && (
                <span className="noValid">{valideEmail}</span>
              )}
              {valideEmail === 'Email válido' && (
                <span className="isValid">{valideEmail}</span>
              )}
              <input
                data-testid="password-input"
                type="password"
                className="form-control"
                placeholder="Digite sua senha"
                onChange={ this.handleChange }
                name="password"
                value={ password }
              />
              {validePassword === 'Senha inválida'
                && (<span className="noValid">{validePassword}</span>)}
              {validePassword === 'Senha válida'
               && (<span className="isValid">{validePassword}</span>)}
              <button
                type="submit"
                className="btn btn-success"
                onClick={ this.handleSubmit }
                disabled={ btnLogin }
              >
                Entrar
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (data) => dispatch(updateDataUser(data)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  login: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
