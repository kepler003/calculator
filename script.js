
class Calculator {
  constructor(elem) {
    this.subdisplay = elem.querySelector('.calc__display-sub');
    this.display = elem.querySelector('.calc__display-main');

    this.operators = ['+', '-', '*', '/'];
    this.sub = null;
    this.main = null;

    elem.addEventListener('click', (e) => this.handleEvent(e));
  }
}

new Calculator(document.querySelector('.calc'));