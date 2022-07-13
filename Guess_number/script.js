"use strict";

// TODO SET TEXT CONTENT
function select_and_set_textContent(_class, msg) {
  document.querySelector(_class).textContent = msg;
}

// TODO SET VALUE OF INPUT
function select_and_set_value(_class, value) {
  document.querySelector(_class).value = value;
}

// TODO SET BACKGROUND COLOR
function select_and_set_background(_class, color) {
  document.querySelector(_class).style.backgroundColor = color;
}

// TODO SET WIDTH
function select_and_set_width(_class, wid) {
  document.querySelector(_class).style.width = wid;
}

// TODO WHEN GUESS GREATER OR LESS THAN CORRECT NUMBER
function check_score(msg) {
  if (score > 1) {
    select_and_set_textContent(".right__msg", msg);
    score--;
    select_and_set_textContent(".right__score", `💯 Score: ${score}`);
  } else {
    select_and_set_textContent(".right__msg", "😭 You Lost The Game!");
    select_and_set_textContent(".right__score", `💯 Score: 0`);
    score = 0;
  }
}

// TODO WHEN GUESS IS CORRECT
function guess_is_correct() {
  select_and_set_textContent(".right__msg", "🎉 Correct Guess!");
  select_and_set_textContent(".number__cube", hidden_number);
  select_and_set_background("body", "#60b347");
  select_and_set_width(".number__cube", "30rem");
  if (score > highscore) {
    highscore = score;
    select_and_set_textContent(
      ".right__highscore",
      `🥇 Highscore: ${highscore}`
    );
  }
}

// TODO WHEN GUESS IS WRONG
function guess_is_wrong() {
  select_and_set_textContent(".right__msg", "❌ Wrong Input");
}

// TODO RESET THE GAME
function reset_game() {
  select_and_set_textContent(".right__msg", "Start guessing...");
  select_and_set_value(".left__guess", "");
  select_and_set_background("body", "#222");
  select_and_set_width(".number__cube", "20rem");
  select_and_set_textContent(".number__cube", "?");
  hidden_number = Math.trunc(Math.random() * 20) + 1;
  score = 20;
  select_and_set_textContent(".right__score", "💯 Score: 20");
}

// TODO GAME LOGIC
function game_logic() {
  const input = Number(document.querySelector(".left__guess").value);
  if (typeof input === NaN || typeof input === null || input <= 0 || input > 20)
    guess_is_wrong();
  else if (input < hidden_number) check_score("📉 Too Low!");
  else if (input > hidden_number) check_score("📈 Too High!");
  else if (input === hidden_number) guess_is_correct();
}

// TODO GAME VARS
let hidden_number = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

// TODO CHECK BUTTON IS CLICKED
document.querySelector(".btn__check").addEventListener("click", game_logic);

// TODO AGAIN BUTTON IS CLICKED
document.querySelector(".btn__again").addEventListener("click", reset_game);
