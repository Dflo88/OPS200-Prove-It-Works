const express = require('express');
                const expect = require('chai').expect;
                const path = require('path');
                const Nightmare = require('nightmare');
                
                const app = express();
                
                app.use(express.static(path.join(__dirname, '../../public')));
                app.use(express.static(path.join(__dirname, '../../dist')));
                
                const url = 'http://localhost:8888';
                
                const nightmare = new Nightmare();
                
                describe('End to End Tests', () => {
                    let httpServer = null;
                    let pageObject = null;
                
                    before((done) => {
                    httpServer = app.listen(8888);
                    done();
                    });
                
                    beforeEach(() => {
                    pageObject = nightmare.goto(url);
                    });
                
                    after((done) => {
                    httpServer.close();
                    done();
                    });
                
                    // This is where your code is going to go
                    it('should contain a <h1> element for the page title', () => { 
                        return pageObject
                            .evaluate(() => document.querySelector('h1').innerText)
                            .then(headerText => {
                            expect(headerText).to.not.be.null;
                            expect(headerText).to.equal('Mortgage Calculator');
                            });
                        });

                    it('should contain an input box for principal values', () => {
                        return pageObject
                            .evaluate(()=> document.querySelector('input[name="principal"]'))
                            .then((principalInput) => {
                            expect(principalInput).to.not.be.null;
                            expect(principalInput).to.exist;
                            });
                        });

                    it('should contain an input box for interest rate values with an id of "interestRateInput', () => {
                        return pageObject
                            .evaluate(()=> document.querySelector('input#interestRateInput'))
                            .then((interestRateInput) => {
                            expect(interestRateInput).to.not.be.null;
                            expect(interestRateInput).to.exist;
                            });
                        });

                    it('should contain a select box with a loan period option of "4"', () => {
                        return pageObject
                            .evaluate(() => document.querySelector('select option#quarterlyOption').innerText)
                            .then((selectOption) => {
                            expect(selectOption).to.not.be.null;
                            expect(selectOption).to.exist;
                            expect(selectOption).to.equal('Quarterly');
                            });
                    });

                    it('should correctly calculate mortgage', () =>
                    pageObject
                    .wait()
                    .type('input#principalInput', 300000)
                    .type('input#interestRateInput', 3.75)
                    .type('input#loanTermInput', 30)
                    .select('select[name=period]', 12)
                    .click('button#calculate')
                    .wait('#output')
                    .evaluate(() => document.querySelector('#output').innerText)
                    .then((outputText) => {
                        expect(outputText).to.equal('$1389.35');
                    })
                    ).timeout(6500);

                    it('should correctly calculate mortgage', () => 
                    pageObject
                    .wait()
                    .type('input[name=principal]', 100000)
                    .type('input[name=interestRate]', 3.92)
                    .type('input[name=loanTerm]', 30)
                    .select('select[name=period]', 12)
                    .click('button#calculate')
                    .wait('#output')
                    .evaluate(() => document.querySelector('#output').innerText)
                    .then((outputText) => {
                        expect(outputText).to.equal('$472.81');
                    })
                    ).timeout(6500);
                    
                    it('should display error message if user inputs a zero value for the principal value.', () => 
                    pageObject
                    .wait()
                    .type('input#principalInput', 0)
                    .type('input#interestRateInput', 4.00)
                    .type('input#loanTermInput', 15)
                    .select('select[name=period]', 12)
                    .click('button#calculate')
                    .wait('#output')
                    .evaluate(() => document.querySelector('#output').innerText)
                    .then((outputText) => {
                    expect(outputText).to.equal('Please enter positive values for your principal, interest rate, and loan term values. Negative values, zeros, or letters/characters are not accepted.');
                    })
                    ).timeout(6500)

                    it('should display error message if user inputs a zero value for the interest rate.', () => 
                    pageObject
                    .wait()
                    .type('input#principalInput', 500000)
                    .type('input#interestRateInput', 0)
                    .type('input#loanTermInput', 15)
                    .select('select[name=period]', 12)
                    .click('button#calculate')
                    .wait('#output')
                    .evaluate(() => document.querySelector('#output').innerText)
                    .then((outputText) => {
                    expect(outputText).to.equal('Please enter positive values for your principal, interest rate, and loan term values. Negative values, zeros, or letters/characters are not accepted.');
                    })
                    ).timeout(6500)

                    it('should display error message if user forgets to input a value.', () => 
                    pageObject
                    .wait()
                    .type('input#principalInput', 700000)
                    .click('button#calculate')
                    .wait('#output')
                    .evaluate(() => document.querySelector('#output').innerText)
                    .then((outputText) => {
                    expect(outputText).to.equal('Please enter positive values for your principal, interest rate, and loan term values. Negative values, zeros, or letters/characters are not accepted.');
                    })
                    ).timeout(6500)

                    it('should correctly calculate mortgage using a default period of 12.', () => 
                    pageObject
                    .wait()
                    .type('input#principalInput', 270000)
                    .type('input#interestRateInput', 3.625)
                    .type('input#loanTermInput', 30)
                    .click('button#calculate')
                    .wait('#output')
                    .evaluate(() => document.querySelector('#output').innerText)
                    .then((outputText) => {
                    expect(outputText).to.equal('$1231.34');
                    })
                    ).timeout(6500)

                    it('should display error message if user inputs characters instead of values.', () => 
                    pageObject
                    .wait()
                    .type('input#principalInput', 'a')
                    .type('input#interestRateInput', 3.625)
                    .type('input#loanTermInput', 30)
                    .click('button#calculate')
                    .wait('#output')
                    .evaluate(() => document.querySelector('#output').innerText)
                    .then((outputText) => {
                    expect(outputText).to.equal('Please enter positive values for your principal, interest rate, and loan term values. Negative values, zeros, or letters/characters are not accepted.');
                    })
                    ).timeout(6500)

                    
                })