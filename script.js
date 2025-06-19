// Get references to important DOM elements
const display = document.getElementById("display");
const displayText = document.getElementById("display-text");

const numbers = document.querySelectorAll(".number"); // All number buttons
const operators = document.querySelectorAll(".operator"); // All operator buttons
const reset = document.querySelector(".reset"); // AC button
const cancel = document.querySelector(".cancel"); // C button
const equal = document.querySelector(".equals"); // = button

// Variable to keep track of the current input expression
let expression = "";

// Add click event listeners to number buttons
numbers.forEach(btn => {
    btn.addEventListener("click", () => {
        const value = btn.textContent;
        expression += value; // Append clicked number to expression
        displayText.textContent = expression; // Update display
    });
});

// Add click event listeners to operator buttons
operators.forEach(btn => {
    btn.addEventListener("click", () => {
        const value = btn.textContent;
        const operators = ['%', ':', 'x', '-', '+', '-'];
        const lastChar = expression.slice(-1); // Get last character in expression

        // Prevent adding operator if last character is already an operator
        if (!operators.includes(lastChar)) {
            expression += value; // Append operator to expression
            displayText.textContent = expression; // Update display
        }
    });
});

// Cancel (C) button: remove last character from expression
cancel.addEventListener("click", () => {
    expression = expression.slice(0, -1); // Remove last char
    displayText.textContent = expression; // Update display
});

// Reset (AC) button: clear entire expression
reset.addEventListener("click", () => {
    expression = ""; // Clear expression
    displayText.textContent = expression; // Update display
});

// Equals (=) button: evaluate the expression
equal.addEventListener("click", () => {
    try {
        // Replace calculator-specific symbols with JS operators
        let sanitizedExpression = expression
            .replace(/x/g, '*')   // Replace 'x' with '*'
            .replace(/:/g, '/')   // Replace ':' with '/'
            .replace(/,/g, '.')   // Replace ',' with '.'
            .replace(/%/g, '/100'); // Replace '%' with '/100' (percentage)

        // Evaluate the expression safely
        let result = eval(sanitizedExpression);

        // Display the result and update expression with the result for further calculations
        displayText.textContent = result;
        expression = result.toString();

    } catch (e) {
        // If evaluation fails, display error and reset expression
        displayText.textContent = "Error";
        expression = "";
    }
});
