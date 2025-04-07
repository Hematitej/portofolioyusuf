let display = document.getElementById("display");

function insertNumber(num) {
    if (display.value === "0") {
        display.value = num;
    } else {
        display.value += num;
    }
}

function insertOperator(op) {
    let lastChar = display.value.slice(-1);
    if ("+-*/%".includes(lastChar)) {
        display.value = display.value.slice(0, -1) + op;
    } else {
        display.value += op;
    }
}

function insertDecimal() {
    let lastNum = display.value.split(/[\+\-\*\/]/).pop();
    if (!lastNum.includes(".")) {
        display.value += ".";
    }
}

function clearEntry() {
    display.value = "0";
}

function clearAll() {
    display.value = "0";
}

function backspace() {
    display.value = display.value.slice(0, -1);
    if (display.value === "") {
        display.value = "0";
    }
}

function calculate() {
    try {
        display.value = eval(display.value);
    } catch {
        display.value = "Error";
    }
}

function toggleSign() {
    if (display.value !== "0") {
        display.value = display.value.startsWith("-") ? display.value.slice(1) : "-" + display.value;
    }
}

function square() {
    display.value = Math.pow(parseFloat(display.value), 2);
}

function squareRoot() {
    display.value = Math.sqrt(parseFloat(display.value));
}