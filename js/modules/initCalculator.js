import { clearInput } from "./clearInput.js";
import { calculatorData } from "./calculatorData.js";

export const initCalculator = () => {
    const calculator = document.querySelector('.calculator');
    const inputDisplay = document.querySelector('.calculator__display');
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

    const getButtonId = (e) => {
        let buttonId = e.target.id;
        if (buttonId === '') {
            buttonId = e.target.closest('button')?.id;
        }
        return buttonId;
    }

    const addInput = () => {
        inputDisplay.value += calculatorData.currentInput;
        calculatorData.prevInput = calculatorData.currentInput;
    }

    const canAddDecimal = () => {
        const currentString = inputDisplay.value;
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
        let buttonId = Object.hasOwn(keyMap, e.key) ? keyMap[e.key] : e.key;
        handleAction(buttonId);
    }

    const buttonsClickHandler = (e) => {
        let buttonId = getButtonId(e);

        if (buttonId !== 'switch' && !calculatorData.isOn || buttonId === '') {
            return;
        } else if (calculatorData.isCalculated) {
            calculatorData.isCalculated = false;
            clearInput('aclear');
        }
        handleAction(buttonId);
    }

    const handleAction = (buttonId) => {
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