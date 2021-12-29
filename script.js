
class Calculator {
  constructor(elem) {
    this.subdisplay = elem.querySelector('.calc__display-sub');
    this.display = elem.querySelector('.calc__display-main');

    // this.equation = ['5', '+', '10.5', '*', '2', '*', '5', '-', '16.111', '*'];
    this.equation = null;
    this.result = null;

    elem.addEventListener('click', (e) => this.handleEvent(e));

    this.render();
  }

  handleEvent(e) {
    const target = e.target;
    const value = target.dataset.value;

    if (target.tagName !== 'BUTTON') return;
    if (!value) return;

    if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(value)) this.addNumber(value);
    if (['+', '-', '*', '/'].includes(value)) this.addOperator(value);
    if (value === '.') this.addDot();
    if (value === 'C') this.clearCalculator();
    if (value === '=') this.calculate();

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
        this.equation.push(num);
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
    if (this.equation === null) return;
    
    // Check if last elem ends with a dot
    if (lastOperand.endsWith('.')) return;
    
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

    // Check if equation ends with an operator
    if (['+', '-', '*', '/'].includes(this.equation[this.equation.length - 1])) {
      this.equation.pop();
    }

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

  clearCalculator() {
    console.log('CLEAR');
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
  }

  renderDisplay() {
    if (this.result === null) {
      
      if (this.equation === null) {
        this.display.innerHTML = 0;
      } else {
        this.display.innerHTML = [...this.equation].reverse().find(item => !isNaN(+item)); // Find & render last number in equation
      }
      
    } else {
      this.display.innerHTML = this.result;
    }
  }

  stripNumber(num) {
    if (!num.includes('.')) return num;

    for (let i = 0; i < num.length; i++) {
      const char = num[num.length - 1 - i];
      
      switch (char) {
        case '0':
          num = num.slice(0, -1);
          i--;
          break;
        case '.':
          num = num.slice(0, -1);
          return num;
        default:
          return num;
      }  
    }
  }
}

new Calculator(document.querySelector('.calc'));