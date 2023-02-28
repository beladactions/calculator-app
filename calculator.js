// get the calculator display element
var display = document.getElementById('display');

// get all the calculator button elements
var clearButton = document.getElementById('clear');
var backButton = document.getElementById('backspace');
var divideButton = document.getElementById('divide');
var multiplyButton = document.getElementById('multiply');
var subtractButton = document.getElementById('subtract');
var addButton = document.getElementById('add');
var equalsButton = document.getElementById('equals');
var decimalButton = document.getElementById('decimal');
var numberButtons = document.querySelectorAll('#buttons button:not(#clear):not(#backspace):not(#divide):not(#multiply):not(#subtract):not(#add):not(#equals):not(#decimal)');

// initialize the calculator state
var currentNumber = '';
var currentOperation = null;
var result = null;

// handle number button clicks
numberButtons.forEach(function(button) {
	button.addEventListener('click', function() {
		// append the button's value to the current number
		currentNumber += button.textContent;
		display.textContent = currentNumber;
	});
});

// handle decimal button click
decimalButton.addEventListener('click', function() {
	// append a decimal point to the current number if it doesn't already contain one
	if (!currentNumber.includes('.')) {
		currentNumber += '.';
		display.textContent = currentNumber;
	}
});

// handle clear button click
clearButton.addEventListener('click', function() {
	// reset the calculator state
	currentNumber = '';
	currentOperation = null;
	result = null;
	display.textContent = '';
});

// handle backspace button click
backButton.addEventListener('click', function() {
	// remove the last character from the current number
	currentNumber = currentNumber.slice(0, -1);
	display.textContent = currentNumber;
});

// handle operation button clicks
divideButton.addEventListener('click', function() {
	performOperation();
	currentOperation = '/';
});

multiplyButton.addEventListener('click', function() {
	performOperation();
	currentOperation = '*';
});

subtractButton.addEventListener('click', function() {
	performOperation();
	currentOperation = '-';
});

addButton.addEventListener('click', function() {
	performOperation();
	currentOperation = '+';
});

equalsButton.addEventListener('click', function() {
	performOperation();
	currentOperation = null;
});

// function to perform the current operation
function performOperation() {
	// convert the current number to a number
	var number = parseFloat(currentNumber);
	
	if (isNaN(number)) {
		// if the current number is not a valid number, reset the calculator state
		currentNumber = '';
		currentOperation = null;
		result = null;
		display.textContent = '';
		return;
	}
	
	if (currentOperation === null) {
		// if there is no current operation, set the result to the current number
		result = number;
	} else {
		// perform the current operation on the result and the current number, and store the result
		switch (currentOperation) {
			case '/':
				result /= number;
				break;
			case '*':
				result *= number;
				break;
			case '-':
				result -= number;
				break;
			case '+':
				result += number;
				break;
		}
	}
	
	// display the result
	display.textContent = result;
	
	// reset the current number
	currentNumber = '';
}
