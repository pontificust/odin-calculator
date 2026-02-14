import { calculate, operate, tokenize, parse } from "./modules/index.js";

window.addEventListener('DOMContentLoaded', () => {
    calculate();
    parse(tokenize());
    operate();
});