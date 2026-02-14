export const parse = (tokens) => {
    const postfixTokens = [];
    const operatorStack = [];

    const operatorOrder = {
        '*': ['/', '+', '-', '*'],
        '/': ['*', '+', '-', '/'],
        '+': ['+', '-'],
        '-': ['-', '+'],
    }

    for(let i = 0; i < tokens.length; i += 1) {
        if(isFinite(Number.parseInt(tokens[i]))) {
            postfixTokens.push(tokens[i]);
            continue;
        }

        while(operatorOrder[operatorStack.at(-1)]?.includes(tokens[i])) {
            postfixTokens.push(operatorStack.pop());
        }
        operatorStack.push(tokens[i]);
    }

        for(let i = operatorStack.length - 1; i >= 0; i -= 1){
            postfixTokens.push(operatorStack[i]);
        }
    return postfixTokens;
} 