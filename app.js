/*-------------------------------- Constants --------------------------------*/

// not great, but not bad either
const maximumValue = 999999999999;
const minimumvalue = -99999999999;

/*-------------------------------- Variables --------------------------------*/

let priorNum = '0';
let operator = '+';
let displayNum = '';
let priorOperatorPressed = false;

/*------------------------ Cached Element References ------------------------*/

const calculator = document.querySelector('#calculator');
const display = document.querySelector('.display');

/*----------------------------- Event Listeners -----------------------------*/

// this parses what to do for different button pushes using the event e
calculator.addEventListener('click', (e) => {
    // numbers, when clicked, elongate the display number (up to a point)
    if (e.target.classList.contains('number')) {
        // allows for entering a negative number
        if (displayNum === '' && operator === '-') {
            displayNum = '-' + e.target.innerText;
            show();
        } else if (displayNum.length === 0 && e.target.innerText === '0') {
            // do nothing - is this allowed?
        } else if (displayNum.length < 13) { // max number of digits you can enter
            addToDisplayNum(e.target.innerText);
        } else {
            console.log('ow oof owie too long');
        };
    // operators, when clicked, do stuff
    } else if (e.target.classList.contains('operator')) {
        if (priorOperatorPressed) { // prevent double operator entry
            console.log(`you already clicked the ${operator} button`);
        } else if (displayNum === '' && e.target.innerText !== '-') { // don't muliply/divide/add to nothing!
            console.log('oi pick a number first ya goose');
        } else if (displayNum === '' && e.target.innerText === '-') { // allows entry of negative numbers
            operator = '-';
        } else { // ok phew normalcy
            operator = e.target.innerText;
            priorNum = displayNum;
            displayNum = '';
            priorOperatorPressed = true;
        };
    // clear button - I changed this button's class to make this section less nested. Not explicitly prohibited in the lab!
    } else if (e.target.classList.contains('clear')) {
        clear();
    // equals sign, when clicked, do some math. repeatedly pressing this will re-evaluate, just like an old calculator
    } else if (e.target.classList.contains('equals')) {
        evaluate();
    } else {
        console.log('stop clicking the calculator body! These things are fragile');
    };
});


/*-------------------------------- Functions --------------------------------*/

// helper function for a line of code that gets used a lot
function show() {
    if (displayNum < maximumValue && displayNum > minimumvalue) {
        display.innerText = displayNum.substring(0, 12); // prevent decimal overflow
    } else {
        display.innerText = 'OVERFLOW';
    };
};

// updates the html display by concatenating a given input. this was not a helpful function as it's only called once, but I wrote it so it's staying
function addToDisplayNum(x) {
    displayNum += x;
    show();
};

// clears the html display, resets numbers
function clear() {
    displayNum = '';
    priorNum = '';
    operator = ''; // perhaps not necessary, but nice
    priorOperatorPressed = false;
    show();
};

// uses eval() to do math because I'm lazy and it wasn't prohibited. But yes this app is super hackable.
function evaluate() {
    // console.log(`(${priorNum}) ${operator} (${displayNum})`); // so helpful for debugging
    // do math
    let evaluatedExpression = eval(`(${priorNum}) ${operator} (${displayNum})`).toString(); // eval is dangreous! We could replace this with a bunch of if/elses
    // update stuff
    priorNum = displayNum;
    displayNum = evaluatedExpression;
    // catch teenagers
    if (displayNum === ('80085' || '8008' || '8008135' || '7734')) {
        document.getElementById('surprise').style.display = 'block';
        alert(`i see you. go talk to jesus.`);
    };
    // reset
    priorOperatorPressed = false;
    // actually display all this logic that's happened
    show();
};

