
class Calculator {
  constructor(elem) {
    this.subdisplay = elem.querySelector('.calc__display-sub');
    this.display = elem.querySelector('.calc__display-main');

    this.equation = ['12', '*', '100', '+', '1.99', '/'];
    this.result = null;

    elem.addEventListener('click', (e) => this.handleEvent(e));
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

  addNumber(num) {
    console.log('num: ', num);
  }

  addOperator(operator) {
    console.log('operator: ', operator);
  }

  addDot() {
    console.log('dot: .');
  }

  clearCalculator() {
    console.log('CLEAR');
  }

  calculate() {
    console.log('CALCULATE');
  }

  render() {
    this.renderSubdisplay();
    this.renderDisplay();
  }

  renderSubdisplay() {
    // Check if equation is empty
    if (this.equation === null) return;

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
}

new Calculator(document.querySelector('.calc'));