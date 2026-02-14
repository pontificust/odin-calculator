export const initCaclculator = () => {
    const calculator = document.querySelector('.calculator');
    const inputDisplay = document.querySelector('.calculator__display');
    let isOn = false;
    let currentInput = '';
    let prevInput = '';
    const allowed = {
        '.': ['*', '/', '+', '-'],
        '*': ['.', '-'],
        '/': ['.', '-'],
        '+': ['.'],
        '-': ['*', '/', '.'],
        '': ['.', '-'],
    }

    const getInputType = (input) => {
        return Number.parseInt(input) || input === 0 ? 'number' : 'operator';
    }

    const getButtonId = (e) => {
        let buttonId = e.target.id;
        const switchSpanClassName = 'material-symbols-outlined';
        if(buttonId === '') {
            buttonId = e.target.classList.contains(switchSpanClassName) ? 'switch' : '';
        }
        return buttonId;
    } 

    const inputDigitOrOperator = () => {
        const currentInputType = getInputType(currentInput);
        
        if(currentInputType === 'number' && prevInput === '.'){
            inputDisplay.value += currentInput;
            prevInput += currentInput;
        } else if(currentInputType === 'number') {
            inputDisplay.value += currentInput;
            prevInput = currentInput;
         } else {
                const prevInputType = getInputType(prevInput);
                if(prevInputType === 'number' && prevInput > 0) {
                    inputDisplay.value += currentInput;
                    prevInput = currentInput;
                } else if(allowed[prevInput]?.includes(currentInput)) {
                    console.log(prevInput)
                    inputDisplay.value += currentInput;
                    prevInput = currentInput;
                } else {
                    return;
                }
            }
        }
    
    const clearInput = (buttonId) => {
        const inputValue = inputDisplay.value;
        if(buttonId === 'aclear') {
            inputDisplay.value = '';
            currentInput = '';
            prevInput = '';
        } else {
            inputDisplay.value = inputValue.slice(0, inputValue.length - 1);
            prevInput = inputDisplay.value.slice(inputDisplay.value.length - 1);
        }
    }
    
    const switchCalculator = () => {
        isOn = isOn ? false : true;
        if(!isOn) {
            clearInput('aclear');
        }
    }

    const buttonsClickHandler = (e) => {
        let buttonId = getButtonId(e);

        if(buttonId !== 'switch' && !isOn || buttonId === '') {
            return;
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
                currentInput = buttonId;
                inputDigitOrOperator();
                break;
        }
    }

    calculator.addEventListener('click', buttonsClickHandler);
}