const expect = require('chai').expect;
const Mortgage = require('../../src/js/lib/Mortgage');

describe('Mortgage Calculator', () => {
    let mortgage = new Mortgage();

    // beforeEach(() => {
    // mortgage = new Mortgage();
    // });

    it('should have a monthlyPayment function', () => {
        expect(mortgage.monthlyPayment).to.exist;
    })

    it('should have a principal value', () => {
        expect(mortgage.principal=300000);
        expect(mortgage.principal).to.equal(300000);
    })

    it('should have an interest value', () => {
        expect(mortgage.interest=3.625);
        expect(mortgage.interest).to.equal(3.625);
    })

    it('should have a term value', () => {
        expect(mortgage.term=30).to.exist;
        expect(mortgage.term).to.equal(30);
    })

    it('should have a period value', () => {
        expect(mortgage.period=12).to.exist;
        expect(mortgage.period).to.equal(12);
    })

    it('should calculate monthly payment', () => {
        expect(mortgage.monthlyPayment()).to.equal(1368.15);
    })

    it('should calculate monthly payment', () => {
        expect(mortgage.principal=500000).to.exist;
        expect(mortgage.interest=2.999).to.exist;
        expect(mortgage.term=15).to.exist;
        expect(mortgage.period=12).to.exist;
        expect(mortgage.monthlyPayment()).to.equal(3452.67);
    })



});