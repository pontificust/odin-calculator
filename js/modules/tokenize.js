export const tokenize = () => {
    const display = document.querySelector('.calculator__display');
    let inputValue = display.textContent;
    const tokens = [];
    let prevToken = '';
    let number = '';
    let token = '';

    if(inputValue.includes('Infinity')) {
        tokens.push(Infinity);
        inputValue = inputValue.replace('Infinity', '');
    }

    for (let i = 0; i < inputValue.length; i += 1) {
        prevToken = token;
        token = inputValue[i];
        if (!isNaN(Number.parseInt(token)) && i !== inputValue.length - 1 ||
            token === '.' || i === 0 && token === '-' || token === '-' && (prevToken === '*' || prevToken === '/')) {
            number += token;
        } else if (number !== '' && i === inputValue.length - 1) {
            number += token;
            tokens.push(number);
        } else if (number !== '') {
            tokens.push(number, token);
            number = '';
        } else {
            tokens.push(token);
        }
    }
    return tokens;
}