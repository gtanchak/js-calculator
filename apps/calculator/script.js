let buffer = "0";
let runningTotal = 0;
let previousOperator;
let inputScreen = document.querySelector(".screen");

function handleButtonClick(value) {
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  reRender();
}

function flusOperation(value) {
  if (previousOperator === "+") {
    runningTotal += value;
  } else if (previousOperator === "-") {
    runningTotal -= value;
  } else if (previousOperator === "×") {
    runningTotal *= value;
  } else if (previousOperator === "÷") {
    runningTotal /= value;
  }
}

function handleMath(operator) {
  if (buffer === "0") {
    return;
  }
  const intBuffer = parseInt(buffer);
  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flusOperation(intBuffer);
  }
  previousOperator = operator;
  buffer = "0";
}

function handleSymbol(symbol) {
  switch (symbol) {
    case "C":
      buffer = "0";
      break;
    case "←":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.slice(0, -1);
      }
      break;
    case "=":
      if (previousOperator === null) {
        return;
      }
      flusOperation(parseInt(buffer));
      buffer = runningTotal;
      runningTotal = 0;
      break;
    case "+":
    case "-":
    case "÷":
    case "×":
      handleMath(symbol);
      break;
  }
}

function handleNumber(number) {
  if (buffer === "0") {
    buffer = number;
  } else {
    buffer += number;
  }
}

function init() {
  document
    .querySelector(".calc-buttons")
    .addEventListener("click", function (event) {
      handleButtonClick(event.target.innerText);
    });
}

function reRender() {
  inputScreen.innerText = buffer;
}

init();
