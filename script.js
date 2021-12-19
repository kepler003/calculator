
class Calculator {
  constructor(elem) {
    this.subdisplay = elem.querySelector('.calc__display-sub');
    this.display = elem.querySelector('.calc__display-main');

    this.equation = ['10', '+', '1.5', '*', '2', '-', '100', '/', '10'];
    this.operators = ['+', '-', '*', '/'];

    elem.addEventListener('click', (e) => this.handleEvent(e));
  }

  handleEvent(e) {
    const btn = e.target;
    if (btn.tagName !== 'BUTTON') return;
    
    const value = btn.dataset.value;
    
    if (this.operators.includes(value)) this.addOperator(value);
    if (!isNaN(+value))                 this.addNumber(value);
    if (value === '.')                  this.addDot();
    if (value === 'res') this.calculate();

    console.log(this.equation);
  }

  addNumber(number) {
    const lastElem = this.equation[this.equation.length - 1];
    
    // Check if last elem is an operator
    if (this.operators.includes(lastElem)) {
      this.equation.push(number.toString());
    
    // Check if last operand is equal to 0
    } else if (lastElem === '0') {
      this.equation[this.equation.length - 1] = number.toString();

    // Add number to last elem
    } else {
      this.equation[this.equation.length - 1] = lastElem + number;
    }
  }

  addDot() {
    const lastElem = this.equation[this.equation.length - 1];
    // Check if equation is empty
    if (!this.equation.length) return;

    // Check if last element is an opertor
    if (this.operators.includes(lastElem)) return;

    // Check if last elem has a dot
    if (lastElem.includes('.')) return;

    this.equation[this.equation.length - 1] = lastElem + '.';
  }

  addOperator(operator) {
    // Check if numbers are not provided
    if (!this.equation.length) return;

    // Check if last element of the equation is an operator
    if (this.operators.includes(this.equation[this.equation.length - 1])) return;

    // Check if last digit is a dot
    if (this.equation[this.equation.length - 1][this.equation[this.equation.length - 1].length - 1] === '.') return;
    
    this.equation.push(operator);
  }

  calculate() {

  }
}

new Calculator(document.querySelector('.calc'));