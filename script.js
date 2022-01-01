
class Calculator {
  constructor(elem) {
    this.subdisplay = elem.querySelector('.calc__display-sub');
    this.display = elem.querySelector('.calc__display-main');

    this.equation = null;
    this.result = null;

    elem.addEventListener('click', (e) => this.handleClickEvent(e));
    window.addEventListener('keydown', (e) => this.handleKeyDownEvent(e));

    this.render();
  }

  handleClickEvent(e) {
    const target = e.target;
    const value = target.dataset.value;

    if (target.tagName !== 'BUTTON') return;
    if (!value) return;

    if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
         '+', '-', '*', '/', '.'].includes(value)) this.recalculate();

    if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(value)) this.addNumber(value);
    if (['+', '-', '*', '/'].includes(value)) this.addOperator(value);
    if (value === '.') this.addDot();
    if (value === 'C') this.clearCalculator();
    if (value === 'D') this.removeLastChar();
    if (value === '=') this.calculate();

    this.render();
  }

  handleKeyDownEvent(e) {
    const value = e.key;

    if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
         '+', '-', '*', '/', '.'].includes(value)) this.recalculate();

    if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(value)) this.addNumber(value);
    if (['+', '-', '*', '/'].includes(value)) this.addOperator(value);
    if (value === '.') this.addDot();
    if (value === 'Delete') this.clearCalculator();
    if (value === 'Backspace') this.removeLastChar();
    if (value === 'Enter') this.calculate();

    this.render();
  }

  addNumber(num = '0') {
    const lastOperand = this.equation?.[this.equation.length - 1] || null;

    // Check if last num has more than 9 digits
    if (lastOperand?.length > 9) return;

    switch (lastOperand) {
      case '+':
      case '-':
      case '*':
      case '/':
        if (this.equation.length === 1 && lastOperand === '-') {
          this.equation[this.equation.length - 1] += num;
        } else {
          this.equation.push(num);
        }
        break;
      case '0':
        if (num === '0') return;
        this.equation[this.equation.length - 1] = num;
        break;
      case null:
        this.equation = [num];
        break;
      default:
        this.equation[this.equation.length - 1] += num;
        break;
    }
  }

  addOperator(operator = '+') {
    const lastOperand = this.equation?.[this.equation.length - 1];

    // Check if equation is empty
    if (this.equation !== null) {

      // Check if last elem ends with a dot
      if (lastOperand.endsWith('.')) return;
  
      // Strip last elem
      if (!['+', '-', '*', '/'].includes(lastOperand)) {
        this.equation[this.equation.length - 1] = Number.parseFloat(lastOperand).toString();
      }
      
      if (lastOperand === '-' && this.equation.length === 1) {  // Toggle minus
        this.equation = null;
      } else {                                                  // Add / change operators
        switch (lastOperand) {
          case '+':
          case '-':
          case '*':
          case '/':
            this.equation[this.equation.length - 1] = operator;
            break;
          default:
            this.equation.push(operator);
            break;
        }
      }

    } else if (operator === '-') {
      this.equation = ['-'];
    }
  }

  addDot() {
    const lastOperand = this.equation?.[this.equation.length - 1] || null;

    // Check if too many digits
    if (lastOperand?.length > 8) return;

    // Check if last equation element has a decimal point
    if (lastOperand?.includes('.')) return;
    
    switch (lastOperand) {
      case '+':
      case '-':
      case '*':
      case '/':
        this.equation.push('0.');
        break;
      case null:
        this.equation = ['0.'];
        break;
      default:
        this.equation[this.equation.length - 1] += '.';
        break;
    }
  }

  calculate() {
    // Check if equation is empty
    if (this.equation === null) return;

    // Check if the only elem is a minus char
    if (this.equation.length === 1 && this.equation[this.equation.length - 1] === '-') {
      this.equation = ['0'];
    }

    // Check if equation ends with an operator
    if (['+', '-', '*', '/'].includes(this.equation[this.equation.length - 1])) {
      this.equation.pop();
    }

    // Strip last elem
    this.equation[this.equation.length - 1] = Number.parseFloat(this.equation[this.equation.length - 1]).toString();

    const equation = [...this.equation];

    // Multiply & divide
    for (let i = 0; i < equation.length; i++) {
      if (!['*', '/'].includes(equation[i])) continue;

      const a = +equation[i - 1];
      const b = +equation[i + 1];

      switch (equation[i]) {
        case '*':
          equation.splice(
            i - 1,
            3,
            (a * b).toString()
          );
          break;
        case '/':
          equation.splice(
            i - 1,
            3,
            (a / b).toString()
          );
          break;
      }

      i--;
    }

    // Add & subtract
    for (let i = 0; i < equation.length; i++) {
      if (!['+', '-'].includes(equation[i])) continue;

      const a = +equation[i - 1];
      const b = +equation[i + 1];

      switch (equation[i]) {
        case '+':
          equation.splice(
            i - 1,
            3,
            (a + b).toString()
          );
          break;
        case '-':
          equation.splice(
            i - 1,
            3,
            (a - b).toString()
          );
          break;
      }

      i--;
    }
    
    // Assign result & deal with loosing floating point precision
    this.result = +(+equation[0]).toPrecision(12);
  }

  recalculate() {
    if (this.equation !== null && this.result !== null) {
      this.equation = [this.result.toString()];
      this.result = null;
    }
  }

  clearCalculator() {
    this.equation = null;
    this.result = null;
  }

  removeLastChar() {
    const lastOperand = this.equation?.[this.equation.length - 1] || null;
    
    if (this.equation === null) return;

    if (lastOperand.length > 1) {
      this.equation[this.equation.length - 1] = this.equation[this.equation.length - 1].slice(0, -1);
    } else {
      this.equation.pop();
      if (this.equation.length === 0) this.equation = null;
    }

    this.result = null;
  }

  render() {
    this.renderSubdisplay();
    this.renderDisplay();
  }

  renderSubdisplay() {
    // Check if equation is empty
    if (this.equation === null) {
      this.subdisplay.innerHTML = '';
    } else {
      // Change multiplying and division operators
      const equation = this.equation.map(item => {
        if (item === '*') {
          return '&times;';
        } else if (item === '/') {
          return '&divide;';
        } else {
          return item;
        }
      });
  
      this.subdisplay.innerHTML = equation.join('');
    }

    if (this.result !== null) {
      this.subdisplay.innerHTML += '=';
    }
  }

  renderDisplay() {
    if (this.result === null) {
      
      if (this.equation === null) {
        this.display.innerHTML = 0;
      } else {

         // Find & render last number in equation
        this.display.innerHTML = [...this.equation].reverse().find(item => {
          return !isNaN(+item) || item === '-';
        });
      }
      
    } else {
      this.display.innerHTML = this.result;
    }
  }
}

new Calculator(document.querySelector('.calc'));