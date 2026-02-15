import { clearInput } from "./clearInput.js";
import { calculatorData } from "./calculatorData.js";

export const showEvaluationResult = (evaluationResult) => {
    const inputDisplay = document.querySelector('.calculator__display');
    clearInput('aclear');
    if(Number.isFinite(evaluationResult)) {
        inputDisplay.value = evaluationResult;
    } else {
        inputDisplay.value = "ERROR";
    }
    calculatorData.isCalculated = true;
}