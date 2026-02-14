export const showEvaluationResult = (evaluationResult) => {
    const inputDisplay = document.querySelector('.calculator__display');

    inputDisplay.value = evaluationResult;
}