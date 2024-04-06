const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;

const divide = (num1, num2) => {
    if (num2 === 0) {
      return "Error";
    }
    return num1 / num2;
  };



  let userNum1 = null;
  let userNum2 = null;
  let userOperatorSelection = null;
  let equalsPressed = false; 

const operations = {
    'plus': add,
    'minus': subtract,
    'multiply': multiply,
    'divide': divide
};

const operate = (num1, num2, operator) => {
  const result = operations[operator](num1, num2);
  if (result === "Error") {
    return result;
  }
  
  const maxPrecision = 9 - Math.floor(Math.log10(Math.abs(result))) - 1;
  return Number(result.toFixed(Math.max(0, maxPrecision)));
};

const numberButtons = document.querySelectorAll(".number");

numberButtons.forEach(button => {
    button.addEventListener("click", (event) => {
      const numericValue = event.target.dataset.value;
      const display = document.querySelector("#display");

    if (display.textContent.length >= 9) {
        return;
        }


    if (equalsPressed) {
        userNum1 = null;
        userNum2 = null;
        userOperatorSelection = null;
        equalsPressed = false;
        display.textContent = '';
      }

      display.textContent += numericValue;
  
      if (userNum1 === null) {
        userNum1 = numericValue;
        display.textContent = userNum1;
      } else if (userOperatorSelection === null) {
        userNum1 += numericValue;
        display.textContent = userNum1;
      } else if (userNum2 === null) {
        userNum2 = numericValue;
        display.textContent = userNum2;
      } else {
        userNum2 += numericValue;
        display.textContent = userNum2;
      }
    });
  });

const operatorButtons = document.querySelectorAll(".operators");

operatorButtons.forEach(button => {
  button.addEventListener('click', (event) => {
      if (equalsPressed) {
        equalsPressed = false;
      }
      if (userNum1 !== null && userNum2 !== null && userOperatorSelection !== null) {
          const result = operate(Number(userNum1), Number(userNum2), userOperatorSelection);
          if (result === "Error") {
              display.textContent = "Nope";
          } else {
              display.textContent = String(result).slice(0, 9);
              userNum1 = result;
              userNum2 = null;
          }
      }
      userOperatorSelection = event.target.id;
  });
});


const equalsButton = document.querySelector("#equals-btn");

equalsButton.addEventListener('click', (event) => {
    equalsPressed = true;
    if (userNum1 !== null && userNum2 !== null && userOperatorSelection !== null) {
      const result = operate(Number(userNum1), Number(userNum2), userOperatorSelection);
      if (result === "Error") {
          display.textContent = "Nope";
      } else {
          display.textContent = String(Number(result.toFixed(8))).slice(0, 9);
          userNum1 = Number(result.toFixed(8));
          userNum2 = null;
          userOperatorSelection = null;
      }
    }
});
  
const clearButton = document.querySelector("#clear-btn");

clearButton.addEventListener('click', (event) => {

        display.textContent = '0';
        userNum1 = null;
        userNum2 = null;
        userOperatorSelection = null;
    });

const decimalButton = document.querySelector("#decimal-btn");

decimalButton.addEventListener('click', (event) => {
        if (userOperatorSelection === null) {
            if (userNum1 === null) {
                userNum1 = '0.';
                display.textContent = userNum1;
            } else if (!userNum1.includes('.')) {
                userNum1 += '.';
                display.textContent = userNum1;
            }
        } else {
            if (userNum2 === null) {
                userNum2 = '0.';
                display.textContent = userNum2;
            } else if (!userNum2.includes('.')) {
                userNum2 += '.';
                display.textContent = userNum2;
            }
        }
    });

const deleteButton = document.querySelector("#delete-btn");

deleteButton.addEventListener("click", (event) => {
  if (userNum2 !== null) {
    userNum2 = userNum2.slice(0, -1);
    if (userNum2 === "") {
      display.textContent = "0";
    } else {
      display.textContent = userNum2;
    }
  } else if (userOperatorSelection !== null) {
    userOperatorSelection = null;
    display.textContent = userNum1;
  } else if (userNum1 !== null) {
    userNum1 = userNum1.slice(0, -1);
    if (userNum1 === "") {
      display.textContent = "0";
    } else {
      display.textContent = userNum1;
    }
  }
});
document.addEventListener('DOMContentLoaded', (event) => {
  const darkModeCheckbox = document.getElementById('dark-mode-checkbox');
  darkModeCheckbox.addEventListener('change', function() {
    if(this.checked) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  });
});



    