const display = document.getElementById('display');
const keys = document.querySelector('.calculator-keys');

let currentInput = '0';
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;
let isPercentage = false;

function updateDisplay() {
    if (operator && firstOperand !== null) {
        const expression = `${firstOperand} ${operator}`;
        display.textContent = waitingForSecondOperand
            ? expression
            : `${expression} ${currentInput}${isPercentage ? '%' : ''}`;
        return;
    }

    display.textContent = `${currentInput}${isPercentage ? '%' : ''}`;
}

function inputNumber(num) {
    if (waitingForSecondOperand || isPercentage || currentInput === '0') {
        currentInput = num;
        waitingForSecondOperand = false;
        isPercentage = false;
    } else {
        currentInput += num;
    }
}

function inputDecimal(dot) {
    if (waitingForSecondOperand || isPercentage) {
        currentInput = '0.';
        waitingForSecondOperand = false;
        isPercentage = false;
        return;
    }

    if (!currentInput.includes(dot)) {
        currentInput += dot;
    }
}

function handleOperator(nextOperator) {

    if (operator && waitingForSecondOperand) {
        operator = nextOperator;
        return;
    }
    const inputValue = getCurrentValue();

    if (operator && firstOperand !== null) {
        const result = calculate(firstOperand, inputValue, operator);
        const formattedResult = parseFloat(result.toFixed(7));

        firstOperand = formattedResult;
        operator = nextOperator;
        currentInput = `${formattedResult}`;
        waitingForSecondOperand = true;
        isPercentage = false;
        return;
    }

    if (firstOperand === null && !isNaN(inputValue)) {
        firstOperand = inputValue;
    }

    waitingForSecondOperand = true;
    operator = nextOperator;
}

function getCurrentValue() {
    const value = parseFloat(currentInput);
    return isPercentage ? value / 100 : value;
}

function inputPercentage() {
    if (!waitingForSecondOperand) {
        isPercentage = true;
    }
}

function calculate(first, second, op) {
    if (op === '+') return first + second;
    if (op === '-') return first - second;
    if (op === '*') return first * second;
    if (op === '/') return second !== 0 ? first / second : 'Xəta';
    return second;
}

function resetCalculator() {
    currentInput = '0';
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
    isPercentage = false;
}

function handleCalculation() {
    if (operator && firstOperand !== null) {
        const result = calculate(firstOperand, getCurrentValue(), operator);
        currentInput = `${parseFloat(result.toFixed(7))}`;
        firstOperand = null;
        operator = null;
        waitingForSecondOperand = false;
        isPercentage = false;
    } else if (isPercentage) {
        currentInput = `${getCurrentValue()}`;
        isPercentage = false;
    }

    updateDisplay();
}

function deleteLastDigit() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
}

keys.addEventListener('click', (event) => {
    const { target } = event;
    if (!target.matches('button')) return;

    if (target.dataset.action === 'number') {
        inputNumber(target.textContent);
        updateDisplay();
        return;
    }

    if (target.dataset.action === 'decimal') {
        inputDecimal(target.textContent);
        updateDisplay();
        return;
    }

    if (target.dataset.action === 'operator') {
        handleOperator(target.textContent);
        updateDisplay();
        return;
    }

    if (target.dataset.action === 'percent') {
        inputPercentage();
        updateDisplay();
        return;
    }

    if (target.dataset.action === 'calculate') {
        handleCalculation();
        return;
    }

    if (target.dataset.action === 'clear') {
        resetCalculator();
        updateDisplay();
        return;
    }

    if (target.dataset.action === 'delete') {
        deleteLastDigit();
        updateDisplay();
        return;
    }
});

window.addEventListener('keydown', (e) => {
    if ((e.key >= '0' && e.key <= '9')) {
        inputNumber(e.key);
        updateDisplay();
    } else if (e.key === '.') {
        inputDecimal('.');
        updateDisplay();
    } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        handleOperator(e.key);
        updateDisplay();
    } else if (e.key === '%') {
        inputPercentage();
        updateDisplay();
    } else if (e.key === 'Enter' || e.key === '=') {
        handleCalculation();
    } else if (e.key === 'Backspace') {
        deleteLastDigit();
        updateDisplay();
    } else if (e.key === 'Escape' || e.key.toLowerCase() === 'c') {
        resetCalculator();
        updateDisplay();
    }
});

updateDisplay();
