// Initialize DOM elements
const input = document.querySelector("input"),
  guess = document.querySelector(".guess"),
  checkButton = document.querySelector("button"),
  remainChances = document.querySelector(".chances");

// Set initial focus on the input field
input.focus();

// Function to reset the game
const resetGame = () => {
  randomNum = Math.floor(Math.random() * 100); // Generate a new random number
  chance = 10; // Reset chances
  input.disabled = false; // Enable input field
  remainChances.textContent = chance; // Update chances display
  guess.textContent = ""; // Clear guess display
  guess.style.color = "#333"; // Reset guess text color
  input.value = ""; // Clear input field
  checkButton.textContent = "Check"; // Reset button text
};

// Generate a random number between 0 and 99
let randomNum = Math.floor(Math.random() * 100);
let chance = 10;

// Add click event listener to the check button
checkButton.addEventListener("click", () => {
  if (input.disabled) {
    // If the input is disabled, reset the game
    resetGame();
    return;
  }

  chance--; // Decrease chance by 1 on each click
  let inputValue = input.value; // Get the value from the input field

  if (inputValue == randomNum) { // Correct guess
    [guess.textContent, input.disabled] = ["Contgrats! You found the number.", true];
    [checkButton.textContent, guess.style.color] = ["Replay", "#27ae60"];
  } else if (inputValue > randomNum && inputValue < 100) { // Guess is too high
    [guess.textContent, remainChances.textContent] = ["Your guess is high", chance];
    guess.style.color = "#333";
  } else if (inputValue < randomNum && inputValue > 0) { // Guess is too low
    [guess.textContent, remainChances.textContent] = ["Your guess is low", chance];
    guess.style.color = "#333";
  } else { // Invalid input (not in the range 1-99)
    [guess.textContent, remainChances.textContent] = ["Your number is invalid", chance];
    guess.style.color = "#e74c3c";
  }

  if (chance == 0) { // No chances left, game over
    [checkButton.textContent, input.disabled, inputValue] = ["Replay", true, ""];
    [guess.textContent, guess.style.color] = ["You lost the game", "#e74c3c"];
  }
});