
class Calculator {
  constructor(elem) {
    this.subdisplay = elem.querySelector('.calc__display-sub');
    this.display = elem.querySelector('.calc__display-main');

    this.equation = ['0'];
    this.result = null;
    this.operators = ['+', '-', '*', '/'];

    elem.addEventListener('click', (e) => this.handleEvent(e));
  }

  handleEvent(e) {
    const btn = e.target;
    if (btn.tagName !== 'BUTTON') return;
    
    const value = btn.dataset.value;
    
    if (value === '=') {
      this.calculate();
    } else {
      this.recalculate();
    }

    if (this.operators.includes(value)) this.addOperator(value);
    if (!isNaN(+value))                 this.addNumber(value);
    if (value === '.')                  this.addDot();

    this.render();
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
    
    this.result = null;
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

    this.result = null;
  }

  addOperator(operator) {
    // Check if numbers are not provided
    if (!this.equation.length) return;

    // Check if last element of the equation is an operator
    if (this.operators.includes(this.equation[this.equation.length - 1])) return;

    // Check if last digit is a dot
    if (this.equation[this.equation.length - 1][this.equation[this.equation.length - 1].length - 1] === '.') return;
    
    this.equation.push(operator);

    this.result = null;
  }

  calculate() {

    // Check if result is given
    if (this.result) return;
    
    // Check if last element is an operator
    if (this.operators.includes(this.equation[this.equation.length - 1])) return;
    
    // Check if last digit of last element is a dot
    if (this.equation[this.equation.length - 1][this.equation[this.equation.length - 1].length - 1] === '.') return;

    const arr = [...this.equation];

    // multiply & divide
    for (let i = 0; i < arr.length; i++) {

      const operator = arr[i];
      if (!['*', '/'].includes(operator)) continue;
      
      const a = +arr[i - 1];
      const b = +arr[i + 1];

      switch(operator) {
        case '*':
          arr.splice(i - 1, 3, a * b);
          break;
        case '/':
          arr.splice(i - 1, 3, a / b);
          break;
      }

      i = i - 2;
    }

    // add & subtract
    for (let i = 0; i < arr.length; i++) {

      const operator = arr[i];
      if (!['+', '-'].includes(operator)) continue;
      
      const a = +arr[i - 1];
      const b = +arr[i + 1];

      switch(operator) {
        case '+':
          arr.splice(i - 1, 3, a + b);
          break;
        case '-':
          arr.splice(i - 1, 3, a - b);
          break;
      }

      i = i - 2;
    }

    this.result = arr[0];

    // Shorten result if too many digits
    if (this.result.toString().length > 11) {
      this.result = this.result.toExponential(4);
    }
  }

  recalculate() {
    if (this.result !== null) {
      this.equation = [this.result.toString()];
      this.result = null;
    }
  }

  render() {
    
    let equation = this.equation.map(value => {

      if (!['*', '/'].includes(value)) return value;

      switch (value) {
        case '*':
          return '&times;';
        case '/':
          return '&divide;';
      }
    });

    if (this.result !== null) {
      this.display.innerHTML = this.result;
      this.subdisplay.innerHTML = equation.join('') + '=';
    } else {
      this.display.innerHTML = equation.join('');
      this.subdisplay.innerHTML = '';
    }
  }
}

new Calculator(document.querySelector('.calc'));