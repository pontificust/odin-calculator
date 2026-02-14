export const evaluate = (postfixTokens) => {
    const stack = [];
    let evalResult = 0;

    const calculator = {
        firstOperand: 0,
        secondOperand: 0,
        '+': function() {
            return this.firstOperand + this.secondOperand;
        },
        '-': function() {
            return this.firstOperand - this.secondOperand;
        },
        '*': function() {
            return this.firstOperand * this.secondOperand;
        },
        '/': function() {
            return this.firstOperand / this.secondOperand;
        },
    }

    for(let i = 0; i < postfixTokens.length; i += 1) {
        if(isFinite(Number.parseInt(postfixTokens[i]))) {
            stack.push(+postfixTokens[i]);
        } else {
            calculator.secondOperand = stack.pop();
            calculator.firstOperand = stack.pop();
            evalResult = calculator[postfixTokens[i]]();
            stack.push(evalResult);
        }
    }
    return stack[0];
}