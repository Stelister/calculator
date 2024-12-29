let num1, operator, num2;
let lastIsOp = 0;

const btn_container = document.querySelector(".container");
const input = document.querySelector(".input");

btn_container.addEventListener("click", (e) => {

    // reset calc after division by zero is tried
    if (input.textContent === "NICE TRY LMAO") {
        resetCalc();
    }

    const operatorList = ['+', '-', '*', '/'];
    if (e.target.tagName === "BUTTON") {
        const currentChar = e.target.textContent;
        if (currentChar >= 0 && currentChar <= 9) {
            // clear input for 2nd number after an operator is typed
            if (lastIsOp === 1) {
                lastIsOp = 0;
                clearInput();
            }
            if (currentChar === "0" && input.textContent === "0") {
                
            } 
            else if (input.textContent === "0") {
                input.textContent = currentChar;
            }
            else {
                input.textContent += currentChar;
            }
        }
        else if (currentChar === "AC") {
            resetCalc();
        }
        else if (operatorList.includes(currentChar)) {
            if (lastIsOp === 1) {
                // if operators are typed repeatedly
                operator = currentChar;
            }
            else if (input.textContent === "") {
                // do nothing if operators are pressed without any number on screen
            }
            else {
                lastIsOp = 1;
                if (num1 === undefined) {
                    operator = currentChar;
                    num1 = Number(input.textContent);
                }
                else {
                    num2 = Number(input.textContent);
                    num1 = operate(num1, operator, num2);
                    operator = currentChar;
                    input.textContent = +num1.toFixed(3); // rounding off the number to 3 decimal places
                }
            }
        }
        else if ((currentChar === "=") && (num1 !== undefined) && (lastIsOp !== 1)) {
            num2 = Number(input.textContent);
            num1 = operate(num1, operator, num2);
            input.textContent = +num1.toFixed(3);
        }
    }
});

function resetCalc() {
    clearInput();
    num1 = undefined;
    num2 = undefined;
    operator = undefined;
    lastIsOp = 0;
}

function clearInput() {
    input.textContent = "";
}

function operate(a, ope, b) {
    switch (ope) {
        case '+': return add(a, b);
        case '-': return subtract(a, b);
        case '*': return multiply(a, b);
        case '/': return divide(a, b);
    }
}

function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    if (b === 0) {
        input.textContent = "NICE TRY LMAO";
        return;
    }
    return a / b;
}