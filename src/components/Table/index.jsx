import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './style.css';
import BtnEdtit from '../BtnEdit/index';
import BtnDelete from '../BtnDelete/index';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <table className="table table-responsive-sm table-striped">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Descrição</th>
            <th scope="col">Tag</th>
            <th scope="col">Método de pagamento</th>
            <th scope="col">Valor</th>
            <th scope="col">Moeda</th>
            <th scope="col">Câmbio utilizado</th>
            <th scope="col">Valor convertido</th>
            <th scope="col">Moeda de conversão</th>
            <th scope="col">Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => {
            console.log(expense);
            const currency = expense.exchangeRates[expense.currency];
            return (
              <tr key={ expense.id } onClick={ this.handleCheck }>
                <td>{ expense.description }</td>
                <td>{ expense.tag }</td>
                <td>{ expense.method }</td>
                <td>{Number(expense.value).toFixed(2) }</td>
                <td>{ currency.name.split('/')[0] }</td>
                <td>
                  {Number(currency.ask).toFixed(2)}
                  {' '}
                </td>
                <td>
                  {Number(expense.value * currency.ask)
                    .toFixed(2)}

                </td>
                <td>Real</td>
                <td>
                  <BtnEdtit id={ expense.id } />
                  <BtnDelete id={ expense.id } />

                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,

};

export default connect(mapStateToProps)(Table);
