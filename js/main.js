import { initCalculator, evaluate, tokenize, parse, showEvaluationResult } from "./modules/index.js";

window.addEventListener('DOMContentLoaded', () => {
    initCalculator();
    const inputEndHandler = () => {
        const tokens = tokenize();
        const postfixTokens = parse(tokens);
        const evaluationResult = evaluate(postfixTokens);
        showEvaluationResult(evaluationResult);
    }
    document.addEventListener('inputEnd', inputEndHandler);
});