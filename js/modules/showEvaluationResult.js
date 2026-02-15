import { clearInput } from "./clearInput.js";
import { calculatorData } from "./calculatorData.js";

export const showEvaluationResult = (evaluationResult) => {
    console.log(evaluationResult)
    if(!Number.isNaN(evaluationResult) && (evaluationResult || evaluationResult === 0)) {
        const inputDisplay = document.querySelector('.calculator__display');
        clearInput('aclear');
        inputDisplay.value = evaluationResult;
        calculatorData.isCalculated = true;
    } else {
        return;
    }
}