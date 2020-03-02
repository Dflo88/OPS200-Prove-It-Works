import React, { Component } from 'react';
const Mortgage = require('./lib/Mortgage');

export default class App extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
        principal: 0,
        interestRate: 0,
        loanTerm: 0,
        period: 12,
        monthlyPayment: 0,
        alertOpen: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.calculateMonthlyPayment = this.calculateMonthlyPayment.bind(this)
    }

    handleChange(event) {
    switch (event.target.name) {
        case 'principal':
        this.setState({ principal: Number(event.target.value) })
        break;
        case 'loanTerm':
        this.setState({ loanTerm: Number(event.target.value) })
        break;
        case 'period':
        this.setState({ period: Number(event.target.value) })
        break;
        case 'interestRate':
        this.setState({ interestRate: Number(event.target.value) })
        break;
        default:
        break;
    }
    }

    calculateMonthlyPayment() {
      if(this.state.principal === 0 || this.state.interestRate === 0 || this.state.loanTerm === 0) {
        let monthly = document.getElementById('output');
        monthly.innerText = 'Please enter positive values for your principal, interest rate, and loan term values. Negative values, zeros, or letters/characters are not accepted.'
      } else {
        let mortgage = new Mortgage(
            this.state.principal,
            this.state.interestRate,
            this.state.loanTerm,
            this.state.period)
        let monthlyPayment = mortgage.monthlyPayment()
        let monthly = document.getElementById('output')
        monthly.innerText = "$" + monthlyPayment
      }
    }

    render() {
    return (
        <div className='App'>
        <h1> Mortgage Calculator  </h1>
        <input id='principalInput' type='number' onChange={this.handleChange} name='principal' />
        <input id='interestRateInput' type='number' onChange={this.handleChange} name='interestRate' />
        <input id='loanTermInput' type='number'onChange={this.handleChange} name='loanTerm' />
        <select onChange={this.handleChange} name='period'>
            <option default value='12'>Monthly</option>
            <option id='quarterlyOption' value='4'>Quarterly</option>
        </select>
        <button onClick={this.calculateMonthlyPayment} id='calculate' >Calculate</button>
        <p id='output'></p>
        </div>
    );
    }
}
