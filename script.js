
class Calculator {
  constructor(elem) {
    this.subdisplay = elem.querySelector('.calc__display-sub');
    this.display = elem.querySelector('.calc__display-main');

    this.equation = ['10'];
    this.operators = ['add', 'sub', 'mul', 'div'];

    elem.addEventListener('click', (e) => this.handleEvent(e));
  }

  handleEvent(e) {
    const btn = e.target;
    if (btn.tagName !== 'BUTTON') return;
    
    const value = btn.dataset.value;
    
    if (this.operators.includes(value)) this.addOperator(value);
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
}

new Calculator(document.querySelector('.calc'));