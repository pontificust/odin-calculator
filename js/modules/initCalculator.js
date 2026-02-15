import { clearInput } from "./clearInput.js";
import { calculatorData } from "./calculatorData.js";

export const initCalculator = () => {
    const calculator = document.querySelector('.calculator');
    const display = document.querySelector('.calculator__display');
    const allowed = {
        '*': ['-'],
        '/': ['-'],
        '': ['-'],
    }

    const keyMap = {
        'Backspace': 'clear',
        'Escape': 'switch',
        'Enter': '=',
    }

    const getInputType = (input) => {
        const integers = '0123456789';
        if(integers.includes(input)) {
            return 'number';
        } else if(input === '.') {
            return 'decimal';
        }
        return 'operator';
    }

    const addInput = () => {
        display.textContent += calculatorData.currentInput;
        calculatorData.prevInput = calculatorData.currentInput;
    }

    const canAddDecimal = () => {
        const currentString = display.textContent;
        const numbers = currentString.split(/[-+*/]/);

        const lastNumber = numbers.at(-1);
        if(lastNumber.includes('.')){
            return false;
        }
        return true;
    }

    const inputDigitOrOperator = () => {
        const type = getInputType(calculatorData.currentInput);

        if(type === 'number') {
            addInput();
            return;
        }

        if(type === 'decimal') {
            if(canAddDecimal()){
                addInput();
            }
            return;
        }

        const prevType = getInputType(calculatorData.prevInput);
        if(prevType === 'number' || prevType === 'decimal') {
            if(prevType === 'decimal' && getInputType(display.textContent.at(-2)) !== 'number') return;
            addInput();
        } else if(allowed[calculatorData.prevInput]?.includes(calculatorData.currentInput)) {
            addInput()
        }
    }

    const switchCalculator = () => {
        calculatorData.isOn = calculatorData.isOn ? false : true;
        if (!calculatorData.isOn) {
            clearInput('aclear');
        }
    }

    const keyboardHandler = (e) => {
        const isValidChar = '0123456789+-*/=.'.includes(e.key);
        const isMapped = Object.hasOwn(keyMap, e.key);
        if(isValidChar || isMapped) {
            e.preventDefault();
            const buttonId = isMapped ? keyMap[e.key] : e.key;
            handleAction(buttonId);
        }
    }

    const buttonsClickHandler = (e) => {
        let buttonId = e.target.id;
        if (buttonId === '') {
            buttonId = e.target.closest('button')?.id;
        }
        handleAction(buttonId);
    }
    
    const handleAction = (buttonId) => {
        if (buttonId !== 'switch' && !calculatorData.isOn || !buttonId) {
            return;
        } else if (calculatorData.isCalculated) {
            calculatorData.isCalculated = false;
            clearInput('aclear');
            if(getInputType(buttonId) === 'operator' && buttonId !== '-') return;
        }
        switch (buttonId) {
            case 'switch':
                switchCalculator();
                break;
            case 'clear':
            case 'aclear':
                clearInput(buttonId);
                break;
            case '=':
                const inputEndEvent = new CustomEvent('inputEnd');
                document.dispatchEvent(inputEndEvent);
                break;
            default:
                calculatorData.currentInput = buttonId;
                inputDigitOrOperator();
                break;
        }
    }

    calculator.addEventListener('click', buttonsClickHandler);
    window.addEventListener('keydown', keyboardHandler);
}