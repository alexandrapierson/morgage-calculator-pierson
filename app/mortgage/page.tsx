'use client'

import React, { useState } from 'react';

export default function MortgageCalculator() {
    const [principalAmount, setPrincipalAmount] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [loanTerm, setLoanTerm] = useState('');
    const [monthlyPayment, setMonthlyPayment] = useState<string | null>(null);

    const [isValidNumber, setValidNumber] = useState(false);

    function calculateMortgage() {
        const principal = parseFloat(principalAmount);
        const rate = parseFloat(interestRate) / 100;
        const term = parseFloat(loanTerm) * 12;

        if (isNaN(principal) || isNaN(rate) || isNaN(term) || principal < 0 || rate < 0 || term < 0) {
            // Invalid inputs, do not calculate
            setMonthlyPayment(null);
            setValidNumber(true);
            return;
        }

        setValidNumber(false);
        const upperEquation = rate / 12;
        const lowerEquation = 1 - Math.pow((1 + upperEquation), -term);
        const monthly = principal * upperEquation / lowerEquation;

        setMonthlyPayment(monthly.toFixed(2));
    }

    const handleClick = () => {
        calculateMortgage();
    };

    return (
        <div className="container">
            <h1>Mortgage Calculator</h1>
            <h2>Input your Principal Amount, Interest Rate, and Loan Term below</h2>
            <div className="mortgage-calculator">
                <p>Principal Amount:</p>
                <input
                    type="number"
                    name="principalAmount"
                    onChange={(e) => setPrincipalAmount(e.target.value)}
                    value={principalAmount}
                />
                <p>Interest Rate:</p>
                <input
                    type="number"
                    name="interestRate"
                    onChange={(e) => setInterestRate(e.target.value)}
                    value={interestRate}
                />
                <p>Loan Term in Years:</p>
                <input
                    type="number"
                    name="loanTerm"
                    onChange={(e) => setLoanTerm(e.target.value)}
                    value={loanTerm}
                />
                <button onClick={handleClick}>Calculate</button>
            </div>
            {isValidNumber ? (
                <p>You need to enter in valid numbers greater than 0.</p>
            ) : null}
            {monthlyPayment !== null &&
                (<p>Monthly Rate: ${monthlyPayment} per month</p>)}
        </div>

    );
}