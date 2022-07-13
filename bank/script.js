"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
// const account1 = {
//   owner: "Jonas Schmedtmann",
//   movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
//   interestRate: 1.2, // %
//   pin: 1111,
// };

// const account2 = {
//   owner: "Jessica Davis",
//   movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
//   interestRate: 1.5,
//   pin: 2222,
// };

// const account3 = {
//   owner: "Steven Thomas Williams",
//   movements: [200, -200, 340, -300, -20, 50, 400, -460],
//   interestRate: 0.7,
//   pin: 3333,
// };

// const account4 = {
//   owner: "Sarah Smith",
//   movements: [430, 1000, 700, 50, 90],
//   interestRate: 1,
//   pin: 4444,
// };

const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

function update_ui(current_account) {
  display_movements(
    current_account.movements,
    containerMovements,
    false,
    current_account.movementsDates
  );
  calc_and_print_balance(current_account.movements, labelBalance);
  calc_display_summery(
    current_account.movements,
    labelSumIn,
    labelSumOut,
    labelSumInterest,
    current_account.interestRate
  );
  show_date_on_label_date();
}

function display_movements(
  movements,
  containerMovements,
  sort = false,
  movements_dates
) {
  const mov =
    sort === true ? movements.slice().sort((a, b) => a - b) : movements;
  containerMovements.innerHTML = "";
  mov.forEach(function (move, index) {
    const now = new Date(movements_dates[index]);
    const day = `${now.getDate()}`.padStart(2, "0");
    const mounth = `${now.getMonth() + 1}`.padStart(2, "0");
    const year = now.getFullYear();
    const hour = `${now.getHours()}`.padStart(2, "0");
    const min = `${now.getMinutes()}`.padStart(2, "0");
    const type = move > 0 ? "deposit" : "withdrawal";
    const html = `
  <div class="movements__row">
    <div class="movements__type movements__type--${type}">${
      index + 1
    } ${type}</div>
    <div class="movements__date">${day}/${mounth}/${year}</div>
    <div class="movements__value">${new Intl.NumberFormat(
      current_account.locale,
      {
        style: "currency",
        currency: current_account.currency,
      }
    ).format(move)}</div>
  </div>`;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
}

function create_user_names(accounts) {
  accounts.forEach(function (account) {
    account.username = account.owner
      .toLocaleLowerCase()
      .split(" ")
      .map((value) => value[0])
      .join("");
  });
}

function calc_and_print_balance(movements, labelBalance) {
  const balance = movements.reduce((acc, mov) => acc + mov);
  labelBalance.textContent = `${balance}€`;
}

function calc_display_summery(
  movements,
  labelSumIn,
  labelSumOut,
  labelSumInterest,
  interestRate
) {
  const incomes = movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov);

  const out = movements
    .filter((mov) => mov <= 0)
    .reduce((acc, mov) => acc + mov);

  const interest = movements
    .filter((mov) => mov > 0)
    .map((mov) => (mov * interestRate) / 100)
    .filter((int) => int >= 1)
    .reduce((acc, int) => acc + int);

  labelSumIn.textContent = `${incomes}€`;
  labelSumOut.textContent = `${Math.abs(out)}€`;
  labelSumInterest.textContent = `${interest}€`;
}

function show_date_on_label_date() {
  labelDate.textContent = Intl.DateTimeFormat(current_account.locale).format();
}

function log_user_out_time_out() {
  let time = 5 * 60;

  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, "0");
    const second = String(Math.trunc(time % 60)).padStart(2, "0");
    labelTimer.textContent = `${min}:${second}`;

    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = "Log in to get started";
      containerApp.style.opacity = 0;
      containerApp.style.visibility = "hidden";
    }
    time--;
  };
  const timer = setInterval(tick, 1000);
  return timer;
}

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
let current_account, timer;

// TODO EVENT HANDLERS
// Login
function login_handler(event) {
  event.preventDefault();
  current_account = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  if (current_account)
    if (current_account.pin === Number(inputLoginPin.value)) {
      labelWelcome.textContent = `Welcome back, ${
        current_account.owner.split(" ")[0]
      }`;
      inputLoginUsername.value = inputLoginPin.value = "";
      inputLoginUsername.blur();
      inputLoginPin.blur();
      containerApp.style.opacity = "1";
      containerApp.style.visibility = "visible";
      show_date_on_label_date();
      if (timer) clearInterval(timer);
      timer = log_user_out_time_out();
      update_ui(current_account);
    }
}

// Transfer
function transfer_handler(e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const reciver_account = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = "";
  if (
    amount > 0 &&
    reciver_account &&
    current_account.movements.reduce((acc, mov) => acc + mov) >= amount &&
    reciver_account.username !== current_account.username
  ) {
    current_account.movements.push(-amount);
    reciver_account.movements.push(amount);
    current_account.movementsDates.push(new Date());
    reciver_account.movementsDates.push(new Date());
    update_ui(current_account);
    clearInterval(timer);
    timer = log_user_out_time_out();
  }
}

// Close
function close_handler(e) {
  e.preventDefault();
  const confirm_user = inputCloseUsername.value;
  const confirm_pin = Number(inputClosePin.value);
  if (
    confirm_user === current_account.username &&
    confirm_pin === current_account.pin
  ) {
    const index = accounts.findIndex((acc) => acc.username === confirm_user);
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = "";
}

// Loan
function loan_handler(e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (
    amount > 0 &&
    current_account.movements.some((mov) => mov >= amount * 0.1)
  ) {
    current_account.movements.push(amount);
    current_account.movementsDates.push(new Date());
    update_ui(current_account);
  }
  inputLoanAmount.value = "";
  clearInterval(timer);
  timer = log_user_out_time_out();
}

// Sort
let is_sorted = false;
function sort_handler(e) {
  e.preventDefault();
  display_movements(
    current_account.movements,
    containerMovements,
    !is_sorted,
    current_account.movementsDates
  );
  is_sorted = !is_sorted;
}

///////////////////////////////////////////////////////
create_user_names(accounts);
btnLogin.addEventListener("click", login_handler);
btnTransfer.addEventListener("click", transfer_handler);
btnClose.addEventListener("click", close_handler);
btnLoan.addEventListener("click", loan_handler);
btnSort.addEventListener("click", sort_handler);

//////////////////////////////////////////////////////

// const timeout = setTimeout(
//   (name, name2) => console.log(`My name is: ${name} ${name2}`),
//   3000,
//   "Suleiman",
//   "Ali"
// );
// clearTimeout(timeout);

// while (true) {

// }

// setInterval(() => {
//   const now = new Date();
//   console.log(`${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`);
// }, 1000);
