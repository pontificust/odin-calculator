import { clearInput } from "./clearInput.js";
import { calculatorData } from "./calculatorData.js";

export const showEvaluationResult = (evaluationResult) => {
    const display = document.querySelector('.calculator__display');
    if (!Number.isNaN(evaluationResult) && (evaluationResult || evaluationResult === 0)) {
        clearInput('aclear');
        display.textContent = evaluationResult;
        calculatorData.prevInput = evaluationResult;
    } else {
        display.textContent = 'Error';
        calculatorData.prevInput = 'Error';
        return;
    }
}