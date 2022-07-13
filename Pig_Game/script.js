"use strict";

function select(_class) {
  return document.querySelector(_class);
}

function get_active() {
  return left.classList.contains("active") ? 1 : 0;
}

function add_to_current(player) {
  if (player === 0) left_current.textContent = current_score;
  else right_current.textContent = current_score;
}

function switch_player(current_player) {
  left.classList.toggle("active");
  right.classList.toggle("active");
  left_current.textContent = 0;
  right_current.textContent = 0;
}

function make_score_zero() {
  if (get_active() === 0) {
    score_left_EL.textContent = 0;
    players_scores[0] = 0;
  } else {
    score_right_EL.textContent = 0;
    players_scores[1] = 0;
  }
}

function add_to_array() {
  players_scores[get_active()] += current_score;
}

function win() {
  if (players_scores[current_player] >= 100) {
    if (current_player === 0) left.classList.add("winner");
    else right.classList.add("winner");
    btn_roll_EL.classList.add("hidden");
    btn_hold_EL.classList.add("hidden");
    dice_EL.classList.add("hidden");
  }
}

function btn_roll_logic() {
  const dice = Math.trunc(Math.random() * 6 + 1);
  dice_EL.classList.remove("hidden");
  dice_EL.src = `img/dice-${dice}.png`;

  if (dice !== 1) {
    current_score += dice;
    add_to_current(current_player);
  } else {
    current_score = 0;
    switch_player(current_player);
    current_player = current_player === 0 ? 1 : 0;
  }
}

function btn_hold_logic() {
  add_to_array();
  if (current_player === 0) score_left_EL.textContent = players_scores[0];
  else score_right_EL.textContent = players_scores[1];
  current_score = 0;
  left_current.textContent = 0;
  right_current.textContent = 0;
  win();
  switch_player(current_player);
  current_player = current_player === 0 ? 1 : 0;
}

function reset_the_game() {
  left_current.textContent = 0;
  right_current.textContent = 0;
  score_left_EL.textContent = 0;
  score_right_EL.textContent = 0;
  current_score = 0;
  players_scores[0] = 0;
  players_scores[1] = 0;
  current_player = 0;
  left.classList.remove("active");
  right.classList.add("active");
  dice_EL.classList.add("hidden");
  btn_roll_EL.classList.remove("hidden");
  btn_hold_EL.classList.remove("hidden");
  left.classList.remove("winner");
  right.classList.remove("winner");
}

const dice_EL = select(".dice");
const btn_new_EL = select(".btn--new");
const btn_roll_EL = select(".btn--roll");
const btn_hold_EL = select(".btn--hold");

const left = select(".left");
const right = select(".right");

const left_current = select(".left__current--number");
const right_current = select(".right__current--number");

const score_left_EL = select(".left__score");
const score_right_EL = select(".right__score");
let current_score = 0;
const players_scores = [0, 0];

let current_player = get_active();

btn_roll_EL.addEventListener("click", btn_roll_logic);
btn_hold_EL.addEventListener("click", btn_hold_logic);
btn_new_EL.addEventListener("click", reset_the_game);
