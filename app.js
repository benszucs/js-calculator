let numbers = document.getElementsByClassName("number");
let operator = document.getElementsByClassName("operator");
let display = document.getElementById("display");
let equal = document.getElementById("equal");
let clear = document.getElementById("clear");
let decimal = document.getElementById("decimal");

let temp = "";
let currentOperator = "";
let value;
let numss = [];
let opss = [];
let answer;
let chainAnswer = false;

// Operator functions
// Add
const add = (num1, num2) => num1 + num2;

// Subtract
const subtract = (num1, num2) => num1 - num2;

// Multiply
const multiply = (num1, num2) => num1 * num2;

// Divide
const divide = (num1, num2) => num1 / num2;


// Operate function to do the math on two numbers
const operate = (num1, op, num2) => {
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);
  if (op.toString() === "+") {
    return add(num1, num2);
  } else if (op.toString() === "-") {
    return subtract(num1, num2);
  } else if (op.toString() === "*") {
    return multiply(num1, num2);
  } else if (op.toString() === "/") {
    return divide(num1, num2);
  }
}


/*number*/
let addNumber = function addNumber() {

  let attribute = this.getAttribute("data-value");

  temp += attribute;
  display.innerHTML += attribute;

  if (currentOperator != "") {
    opss.push(currentOperator);
    currentOperator = "";
  }
}

for ( var i = 0; i < numbers.length; i++ ) {
  numbers[i].addEventListener('click', addNumber);
}


/* operator */
let addOperate = function addOperate() {

  let attribute = this.getAttribute("data-value");

  if (temp === "") {
    alert("You can't start with an operator");
    opss = [];
  } else {
      currentOperator = attribute;
      display.innerHTML = "";
  }

  if ( chainAnswer === true ) { //checks for equal function
    numss = [];
    opss = [];
    numss.push(temp);
    currentOperator = attribute;
    /* opss.push(attribute); */
    chainAnswer = false;
    temp = "";
  } else {
      if (temp != "") {
        numss.push(temp);
        temp = "";
      }
    }
}


for ( var i = 0; i < operator.length; i++ ) {
  operator[i].addEventListener('click', addOperate);
}


/* Equate */
let equals = function equate() {

  if (temp != "") {
    numss.push(temp);
    temp = "";
  }

  answer = chain(numss, opss);
  display.innerHTML = Number(answer.toFixed(9));
  chainAnswer = true;
  temp = answer.toString();
}

equal.addEventListener('click', equals);


/* clear - not working properly */
let clearAll = () => {
  numss = [];
  opss = [];
  temp = "";
  currentOperator = "";
  display.innerHTML = "";
  chainAnswer = false;
}

clear.addEventListener('click', clearAll);

/* Decimal */ /* all im worried about is temp? */
let addDecimal = function equate() {
  let attribute = this.getAttribute("data-value");
  if ( temp.includes(".") === true ) {
    return;
  } else {
    temp += attribute;
    display.innerHTML += attribute;
  }
}

decimal.addEventListener('click', addDecimal);


/* How do I fucking chain operators?? */
const chain = (numss, opss) => {
  while (numss.length !== 2) {
    value = operate(numss[0], opss[0], numss[1]);
    numss.shift();
    numss.shift();
    opss.shift();
    numss.unshift(value);
  };
  return operate(numss[0], opss[0], numss[1]);
};
