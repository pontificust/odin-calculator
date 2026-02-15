import { calculatorData } from "./calculatorData.js";

export const clearInput = (buttonId) => {
    const display = document.querySelector('.calculator__display');
    const inputValue = display.textContent;
    if (buttonId === 'aclear') {
        display.textContent = '';
        calculatorData.currentInput = '';
        calculatorData.prevInput = '';
    } else {
        display.textContent = inputValue.slice(0, inputValue.length - 1);
        calculatorData.prevInput = display.textContent.slice(display.textContent.length - 1);
    }
}