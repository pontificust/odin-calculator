import { clearInput } from "./clearInput.js";
import { calculatorData } from "./calculatorData.js";

export const showEvaluationResult = (evaluationResult) => {
    if(!Number.isNaN(evaluationResult) && evaluationResult) {
        const inputDisplay = document.querySelector('.calculator__display');
        clearInput('aclear');
        inputDisplay.value = evaluationResult;
        calculatorData.isCalculated = true;
    } else {
        return;
    }
}