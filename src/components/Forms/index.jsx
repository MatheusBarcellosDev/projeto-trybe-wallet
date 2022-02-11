import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpenses, addExpenseseEdit } from '../../actions';
import './style.css';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: [],
      id: 0,
      value: '',
      currency: '',
      method: '',
      tag: '',
      description: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.getCoinsApi = this.getCoinsApi.bind(this);
  }

  componentDidMount() {
    this.getCoinsApi();
  }

  async getCoinsApi() {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    delete data.USDT;
    this.setState({ coins: data });
    return data;
  }

  handleEdit(event) {
    event.preventDefault();
    const { value, currency, method, tag, description, id } = this.state;
    const { addExpenseEdit } = this.props;
    const obj = {
      id,
      value,
      currency,
      method,
      tag,
      description,
    };
    console.log(obj);
    addExpenseEdit(obj);
    this.saveLocalStorage(obj);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { addExpense } = this.props;
    const { value, currency, method, tag, description, id } = this.state;
    const rates = await this.getCoinsApi();
    const obj = {
      id,
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates: rates,
    };
    const newId = id + 1;
    addExpense(obj);
    this.saveLocalStorage(obj);
    this.setState({
      id: newId,
      value: '',
    });
  }

  saveLocalStorage(obj) {
    if (localStorage.getItem('obj') === null) {
      localStorage.setItem('obj', JSON.stringify([obj]));
    } else {
      localStorage.setItem(
        'obj', JSON.stringify([...JSON.parse(localStorage.getItem('obj')), obj]),
      );
    }
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { value, currency, method, tag, description, coins } = this.state;
    const { toEdit } = this.props;
    console.log(toEdit);
    const tags = Object.keys(coins);
    return (
      <form className={ `form bg-${toEdit ? 'success' : 'dark'}` }>
        <div className="form__container col-md-12 d-md-flex">
          <label htmlFor="valor" className="form__valor col-md-2 col-sm-12">
            Valor:
            <input
              type="number"
              className="form-control"
              id="valor"
              onChange={ this.handleChange }
              name="value"
              value={ value }
              data-testid="value-input"
            />
          </label>
          <label htmlFor="moeda" className="form__moeda col-md-2 col-sm-12">
            Moeda:
            <select
              onChange={ this.handleChange }
              className="form-control"
              id="moeda"
              value={ currency }
              name="currency"
              data-testid="currency-input"
            >
              {tags.map((moeda) => (
                <option key={ moeda } value={ moeda } data-testid={ moeda }>
                  {moeda}
                </option>
              ))}
            </select>
          </label>
          <label
            htmlFor="forma-de-pagamento"
            className="form__metodo__pagamento col-md-2 col-sm-12"
          >
            Método de pagamento:
            <select
              className="form-control"
              id="forma-de-pagamento"
              value={ method }
              name="method"
              onChange={ this.handleChange }
              data-testid="method-input"
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag" className="col-md-2 col-sm-12">
            Tag:
            <select
              className="form-control"
              id="tag"
              name="tag"
              onChange={ this.handleChange }
              value={ tag }
              data-testid="tag-input"
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <label htmlFor="descricao" className="col-sm-12 col-md-2">
            Descrição:
            <input
              onChange={ this.handleChange }
              value={ description }
              name="description"
              type="text"
              className="form-control"
              id="descricao"
              data-testid="description-input"
            />
          </label>
          {toEdit ? (
            <button
              type="submit"
              className="btn btn-warning btn__submit_form col-md-2"
              onClick={ this.handleEdit }
            >
              Editar despesa
            </button>
          ) : (
            <button
              type="submit"
              className="btn btn-primary btn__submit_form col-md-2"
              onClick={ this.handleSubmit }
            >
              Adicionar despesa
            </button>
          )}
        </div>
      </form>
    );
  }
}

Form.propTypes = {
  addExpense: PropTypes.func.isRequired,
  addExpenseEdit: PropTypes.func.isRequired,
  toEdit: PropTypes.bool.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addExpense: (expense) => dispatch(addExpenses(expense)),
  addExpenseEdit: (expense) => dispatch(addExpenseseEdit(expense)),
});

const mapStateToProps = (state) => ({
  toEdit: state.wallet.toEdit,
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
