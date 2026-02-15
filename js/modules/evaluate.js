export const evaluate = (postfixTokens) => {
    const stack = [];
    let evalResult = 0;
    let result = 0;

    const calculator = {
        firstOperand: 0,
        secondOperand: 0,
        '+': function () {
            return this.firstOperand + this.secondOperand;
        },
        '-': function () {
            return this.firstOperand - this.secondOperand;
        },
        '*': function () {
            return this.firstOperand * this.secondOperand;
        },
        '/': function () {
            return this.firstOperand / this.secondOperand;
        },
    }

    for (let i = 0; i < postfixTokens.length; i += 1) {
        if (isFinite(parseFloat(postfixTokens[i]))) {
            stack.push(postfixTokens[i]);
        } else {
            calculator.secondOperand = parseFloat(stack.pop());
            calculator.firstOperand = parseFloat(stack.pop());
            evalResult = calculator[postfixTokens[i]]();
            stack.push(evalResult);
        }
    }
    result = stack[0];
    if (Math.abs(stack[0]) % 1 < 1) {
        result = Math.round(stack[0] * 100) / 100;
    }
    return result;
}