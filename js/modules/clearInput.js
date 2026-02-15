import { calculatorData } from "./calculatorData.js";

export const clearInput = (buttonId) => {
    const inputDisplay = document.querySelector('.calculator__display');
    const inputValue = inputDisplay.value;
    if (buttonId === 'aclear') {
        inputDisplay.value = '';
        calculatorData.currentInput = '';
        calculatorData.prevInput = '';
    } else {
        inputDisplay.value = inputValue.slice(0, inputValue.length - 1);
        calculatorData.prevInput = inputDisplay.value.slice(inputDisplay.value.length - 1);
    }
}