// Get references to important DOM elements
const displayText = document.getElementById("display-text");

const numbers = document.querySelectorAll(".number");    // All number buttons
const operators = document.querySelectorAll(".operator"); // All operator buttons
const reset = document.querySelector(".reset");           // AC button (clear all)
const cancel = document.querySelector(".cancel");         // C button (delete last character)
const equal = document.querySelector(".equals");          // = button

// Variable to store the current input expression as a string
let expression = "";

// Maximum length of expression to avoid infinite input or overflow
const maxLength = 30;

// List of valid operator symbols for easy reference
const operatorSymbols = ['%', ':', 'x', '-', '+'];

// Helper function: checks if a character is an operator
function isOperator(char) {
  return operatorSymbols.includes(char);
}

function ClickNumbers(event){

  const btn = event.currentTarget;
  
   // Prevent input if max length is reached
    if (expression.length >= maxLength) return;

    // Append clicked number to the expression string
    expression += btn.textContent;

    // Update the calculator display
    displayText.textContent = expression;
}

function ClickOperators(event){

  const btn= event.currentTarget;
  
   // Prevent starting expression with an operator
    if (expression.length === 0) return;

    // Prevent input if max length is reached
    if (expression.length >= maxLength) return;

    const lastChar = expression.slice(-1); // Get last character of current expression
    const newOperator = btn.textContent;   // Operator button clicked

    // If last character is already an operator,
    // replace it with the new operator (prevents multiple consecutive operators)
    if (isOperator(lastChar)) {
      if(lastChar === newOperator) return;
      
      expression = expression.slice(0, -1) + newOperator;
    } else {
      // Otherwise, simply append the new operator
      expression += newOperator;
    }

    // Update the display with the new expression
    displayText.textContent = expression;
}

function ClickCancel(){
  
  expression = expression.slice(0, -1); // Remove last character
  displayText.textContent = expression; // Update display
}

function ClickReset(){

   expression = "";                      // Clear expression string
  displayText.textContent = expression; // Clear display
  
}

function ClickEqual(){

    if (expression.length === 0) return; // If empty, do nothing

  try {
    // Replace calculator-specific symbols with JavaScript operators
    let sanitizedExpression = expression
      .replace(/[xˣ𝑥×]/g, '*')    // Replace 'x' with '*'
      .replace(/:/g, '/')    // Replace ':' with '/'
      .replace(/,/g, '.')    // Replace ',' with '.' for decimal point
      .replace(/%/g, '/100'); // Replace '%' with '/100' for percentage calculation

    // Remove trailing operators to prevent errors during evaluation
    while (sanitizedExpression.length > 0 && isOperator(sanitizedExpression.slice(-1))) {
      sanitizedExpression = sanitizedExpression.slice(0, -1);
    }

    // Evaluate the sanitized expression using eval()
    let result = eval(sanitizedExpression);

    // Check for invalid results like Infinity or NaN
    if (result === Infinity || result === -Infinity || isNaN(result)) {
      throw new Error("Invalid result");
    }

    // Display the result on the calculator screen
    displayText.textContent = result;

    // Update the expression with the result, allowing for further calculations
    expression = result.toString();

  } catch (error) {
    // If an error occurs (invalid expression), display error message
    displayText.textContent = "Error";

    // Reset the expression
    expression = "";
  }
}
// Add click event listeners to number buttons
numbers.forEach(btn => {
  
  btn.addEventListener("pointerup", ClickNumbers);
  
});

// Add click event listeners to operator buttons
operators.forEach(btn => {
  
  btn.addEventListener("pointerup", ClickOperators);
  
});

// Cancel (C) button: remove the last character from expression
cancel.addEventListener("pointerup", ClickCancel);

// Reset (AC) button: clear the entire expression
reset.addEventListener("pointerup", ClickReset);

// Equals (=) button: evaluate the expression and display the result
equal.addEventListener("pointerup", ClickEqual);
