
class Calculator {
  constructor(elem) {
    this.subdisplay = elem.querySelector('.calc__display-sub');
    this.display = elem.querySelector('.calc__display-main');

    this.equation = ['12', '*', '100', '+', '1.99', '/', '2'];
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
    this.renderEquation();
  }

  renderEquation() {
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

new Calculator(document.querySelector('.calc'));