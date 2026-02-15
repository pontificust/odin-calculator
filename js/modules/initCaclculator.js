import { clearInput } from "./clearInput.js";
import { calculatorData } from "./calculatorData.js";

export const initCaclculator = () => {
    const calculator = document.querySelector('.calculator');
    const inputDisplay = document.querySelector('.calculator__display');
    const allowed = {
        '.': ['*', '/', '+', '-'],
        '*': ['-'],
        '/': ['-'],
        '-': ['*', '/'],
        '': ['-'],
    }

    const getInputType = (input) => {
        return isFinite(Number.parseInt(input)) ? 'number' : 'operator';
    }

    const getButtonId = (e) => {
        let buttonId = e.target.id;
        const switchSpanClassName = 'material-symbols-outlined';
        if(buttonId === '') {
            buttonId = e.target.classList.contains(switchSpanClassName) ? 'switch' : '';
        }
        return buttonId;
    }
    
    const addInput = () => {
        inputDisplay.value += calculatorData.currentInput;
        calculatorData.prevInput = calculatorData.currentInput;
    }

    const inputDigitOrOperator = () => {
        const currentInputType = getInputType(calculatorData.currentInput);
        
        if(currentInputType === 'number'){
            addInput();
        } else if(currentInputType === 'number') {
            addInput();
         } else {
                const prevInputType = getInputType(calculatorData.prevInput);
                if(prevInputType === 'number' && !calculatorData.isFloat && calculatorData.currentInput === '.') {
                    addInput();
                    calculatorData.isFloat = true;
                } else if(prevInputType === 'number' && calculatorData.currentInput !== '.') {
                    addInput();
                    if(calculatorData.isFloat) {
                        calculatorData.isFloat = false;
                    }
                } else if(allowed[calculatorData.prevInput]?.includes(calculatorData.currentInput)) {
                    addInput();
                    console.log(calculatorData.currentInput)
                    if(calculatorData.isFloat) {
                        calculatorData.isFloat = false;
                    }
                } else {
                    return;
                }
            }
        }
    
    const switchCalculator = () => {
        calculatorData.isOn = calculatorData.isOn ? false : true;
        if(!calculatorData.isOn) {
            clearInput('aclear');
        }
    }

    const keyboardHandler = (e) => {
        let clickEvent = new MouseEvent('click', {
            bubbles: true,
        });
        let buttonId = '';
        switch(e.key) {
            case 'Backspace':
                buttonId = 'clear';
                break;
            case 'Escape':
                buttonId = 'switch';
                break;
            case 'Enter':
                buttonId = '=';
                break;
            default:
                buttonId = e.key;
                break;            
        }
        const button = document.getElementById(buttonId);
        button?.dispatchEvent(clickEvent);
    }

    const buttonsClickHandler = (e) => {
        let buttonId = getButtonId(e);

        if(buttonId !== 'switch' && !calculatorData.isOn || buttonId === '') {
            return;
        } else if(calculatorData.isCalculated) {
            calculatorData.isCalculated = false;
            clearInput('aclear');    
        }

        switch(buttonId) {
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