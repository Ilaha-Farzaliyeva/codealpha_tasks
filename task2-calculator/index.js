const display = document.getElementById('display');
const keys = document.querySelector('.calculator-keys');

let currentInput = '0';
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

function updateDisplay() {
    display.textContent = currentInput;
}

function inputNumber(num) {
    if (currentInput === '0') {
        currentInput = num;
    } else {
        currentInput += num;
    }
}

function inputDecimal(dot) {
    if (waitingForSecondOperand) return;
    
    if (!currentInput.includes(dot)) {
        currentInput += dot;
    }
}

function handleOperator(nextOperator) {
    
    if (operator && waitingForSecondOperand) {
        operator = nextOperator;
        currentInput = currentInput.trim().slice(0, -1) + ` ${nextOperator} `;
        return;
    }
    const inputValue = parseFloat(currentInput);    

    if (operator && firstOperand !== null) {
        const result = calculate(firstOperand, inputValue, operator);
        const formattedResult = parseFloat(result.toFixed(7));
        
        firstOperand = formattedResult;
        operator = nextOperator;
        currentInput = `${formattedResult} ${nextOperator} `;
        waitingForSecondOperand = true;
        return;
    }

    if (firstOperand === null && !isNaN(inputValue)) {
        firstOperand = inputValue;
    }

    waitingForSecondOperand = true;
    operator = nextOperator;
    currentInput += ` ${nextOperator} `;
}

function calculate(first, second, op) {
    if (op === '+') return first + second;
    if (op === '-') return first - second;
    if (op === '*') return first * second;
    if (op === '/') return second !== 0 ? first / second : 'Xəta';
    if (op === '%') return (first * second) / 100;
    return second;
}

function resetCalculator() {
    currentInput = '0';
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
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

    if (target.dataset.action === 'calculate') {
        if (operator && firstOperand !== null) {
            const inputValue = parseFloat(currentInput);
            const result = calculate(firstOperand, inputValue, operator);
            currentInput = `${parseFloat(result.toFixed(7))}`;
            firstOperand = null;
            operator = null;
            waitingForSecondOperand = false;
            updateDisplay();
        }
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
    } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/' || e.key === '%') {
        handleOperator(e.key);
        updateDisplay();
    } else if (e.key === 'Enter' || e.key === '=') {
        if (operator && firstOperand !== null) {
            const inputValue = parseFloat(currentInput);
            const result = calculate(firstOperand, inputValue, operator);
            currentInput = `${parseFloat(result.toFixed(7))}`;
            firstOperand = null;
            operator = null;
            waitingForSecondOperand = false;
            updateDisplay();
        }
    } else if (e.key === 'Backspace') {
        deleteLastDigit();
        updateDisplay();
    } else if (e.key === 'Escape' || e.key.toLowerCase() === 'c') {
        resetCalculator();
        updateDisplay();
    }
});

updateDisplay();