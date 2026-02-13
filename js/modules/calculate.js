export const calculate = () => {
    const calculator = document.querySelector('.calculator');
    const inputDisplay = document.querySelector('.calculator__display');
    let isOn = false;

    const getButtonId = (e) => {
        let buttonId = e.target;
        const switchSpanClassName = 'material-symbols-outlined';
        if(buttonId === '') {
            buttonId = e.target.classList.contains(switchSpanClassName) ? 'switch' : '';
        }
        return buttonId;
    } 

    const switchCalculator = () => {
        isOn = isOn ? false : true;
    }

    const inputDigitOrOperator = (text) => {
        inputDisplay.value += text;
    }

    const clearInput = (buttonId) => {
        const inputValue = inputDisplay.value;
        if(buttonId === 'aclear') {
            inputDisplay.value = '';
        } else {
            inputDisplay.value = inputValue.slice(0, inputValue.length - 1);
        }
    }

    const buttonsClickHandler = (e) => {
        let buttonId = getButtonId(e);

        if(buttonId !== 'switch' && !isOn) {
            return;
        }

        switch(buttonId) {
            case 'switch':
                switchCalculator();
                break;
            case 'clear':
            case 'aclear':
                clearInput(buttonId);
                console.log(buttonId)
                break;
            default:
                inputDigitOrOperator(e.target.textContent);
                console.log(buttonId)
                break;
        }
    }

    calculator.addEventListener('click', buttonsClickHandler);
}