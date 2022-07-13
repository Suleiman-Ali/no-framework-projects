"use strict";

class Calculator {
  constructor(prev, current) {
    this.prev = prev;
    this.current = current;
    this.prevValue = "";
    this.currentValue = "";
    this.oper = undefined;
    this.lastValue = "";
  }

  clear() {
    this.prevValue = "";
    this.currentValue = "";
    this.oper = undefined;
    this.updateScreen("", "");
  }

  deletes() {
    this.currentValue = this.currentValue.toString().slice(0, -1);
    this.current.textContent = this.currentValue;
  }

  inputNumber(n) {
    this.currentValue += `${n}`;
    this.current.textContent = this.currentValue;
  }

  inputOperation(o) {
    if (this.oper) {
      this.compute();
      this.inputOperation(o);
      return;
    }

    this.oper = `${o}`;
    this.prevValue = this.currentValue;
    this.currentValue = "";
    this.current.textContent = "";
    this.prev.textContent = this.prevValue + this.oper;
  }

  compute() {
    switch (this.oper) {
      case "+":
        this.currentValue = Number(this.prevValue) + Number(this.currentValue);
        break;
      case "*":
        this.currentValue = Number(this.prevValue) * Number(this.currentValue);
        break;
      case "-":
        this.currentValue = Number(this.prevValue) - Number(this.currentValue);
        break;
      case "÷":
        this.currentValue = Number(this.prevValue) / Number(this.currentValue);
        break;
      default:
        return;
    }

    this.updateScreen("", this.currentValue);
    this.oper = undefined;
  }

  updateScreen(prevText, currentText) {
    this.prev.textContent = prevText;
    this.current.textContent = currentText;
  }
}

const prevNumbers = document.getElementById("prev");
const currentNumbers = document.getElementById("current");
const operators = document.querySelectorAll("[data-operator]");
const numbers = document.querySelectorAll("[data-number]");
const equalsBtn = document.querySelector("[data-equals]");
const allClearBtn = document.querySelector("[data-all-clear]");
const deleteBtn = document.querySelector("[data-delete]");
const calc = new Calculator(prevNumbers, currentNumbers);

allClearBtn.addEventListener("click", calc.clear.bind(calc));
deleteBtn.addEventListener("click", calc.deletes.bind(calc));
equalsBtn.addEventListener("click", calc.compute.bind(calc));
numbers.forEach((btn) =>
  btn.addEventListener("click", (e) => calc.inputNumber(e.target.textContent))
);
operators.forEach((oper) =>
  oper.addEventListener("click", (e) =>
    calc.inputOperation(e.target.textContent)
  )
);
