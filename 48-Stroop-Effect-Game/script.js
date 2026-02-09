const GAME_SECONDS = 30;
const MAX_MISTAKES = 3;

const ALL_NAMED_COLORS = [
	"AliceBlue",
	"AntiqueWhite",
	"Aqua",
	"Aquamarine",
	"Azure",
	"Beige",
	"Bisque",
	"Black",
	"BlanchedAlmond",
	"Blue",
	"BlueViolet",
	"Brown",
	"BurlyWood",
	"CadetBlue",
	"Chartreuse",
	"Chocolate",
	"Coral",
	"CornflowerBlue",
	"Cornsilk",
	"Crimson",
	"Cyan",
	"DarkBlue",
	"DarkCyan",
	"DarkGoldenRod",
	"DarkGray",
	"DarkGrey",
	"DarkGreen",
	"DarkKhaki",
	"DarkMagenta",
	"DarkOliveGreen",
	"DarkOrange",
	"DarkOrchid",
	"DarkRed",
	"DarkSalmon",
	"DarkSeaGreen",
	"DarkSlateBlue",
	"DarkSlateGray",
	"DarkSlateGrey",
	"DarkTurquoise",
	"DarkViolet",
	"DeepPink",
	"DeepSkyBlue",
	"DimGray",
	"DimGrey",
	"DodgerBlue",
	"FireBrick",
	"FloralWhite",
	"ForestGreen",
	"Fuchsia",
	"Gainsboro",
	"GhostWhite",
	"Gold",
	"GoldenRod",
	"Gray",
	"Grey",
	"Green",
	"GreenYellow",
	"HoneyDew",
	"HotPink",
	"IndianRed",
	"Indigo",
	"Ivory",
	"Khaki",
	"Lavender",
	"LavenderBlush",
	"LawnGreen",
	"LemonChiffon",
	"LightBlue",
	"LightCoral",
	"LightCyan",
	"LightGoldenRodYellow",
	"LightGray",
	"LightGrey",
	"LightGreen",
	"LightPink",
	"LightSalmon",
	"LightSeaGreen",
	"LightSkyBlue",
	"LightSlateGray",
	"LightSlateGrey",
	"LightSteelBlue",
	"LightYellow",
	"Lime",
	"LimeGreen",
	"Linen",
	"Magenta",
	"Maroon",
	"MediumAquaMarine",
	"MediumBlue",
	"MediumOrchid",
	"MediumPurple",
	"MediumSeaGreen",
	"MediumSlateBlue",
	"MediumSpringGreen",
	"MediumTurquoise",
	"MediumVioletRed",
	"MidnightBlue",
	"MintCream",
	"MistyRose",
	"Moccasin",
	"NavajoWhite",
	"Navy",
	"OldLace",
	"Olive",
	"OliveDrab",
	"Orange",
	"OrangeRed",
	"Orchid",
	"PaleGoldenRod",
	"PaleGreen",
	"PaleTurquoise",
	"PaleVioletRed",
	"PapayaWhip",
	"PeachPuff",
	"Peru",
	"Pink",
	"Plum",
	"PowderBlue",
	"Purple",
	"RebeccaPurple",
	"Red",
	"RosyBrown",
	"RoyalBlue",
	"SaddleBrown",
	"Salmon",
	"SandyBrown",
	"SeaGreen",
	"SeaShell",
	"Sienna",
	"Silver",
	"SkyBlue",
	"SlateBlue",
	"SlateGray",
	"SlateGrey",
	"Snow",
	"SpringGreen",
	"SteelBlue",
	"Tan",
	"Teal",
	"Thistle",
	"Tomato",
	"Turquoise",
	"Violet",
	"Wheat",
	"White",
	"WhiteSmoke",
	"Yellow",
	"YellowGreen"
];

let COLORS = [];

const timeEl = document.getElementById("time");
const scoreEl = document.getElementById("score");
const mistakesEl = document.getElementById("mistakes");
const cardEl = document.getElementById("card");
const promptEl = document.getElementById("prompt");
const buttonsEl = document.getElementById("buttons");

const overlay = document.getElementById("overlay");
const endTitle = document.getElementById("endTitle");
const endText = document.getElementById("endText");
const restartBtn = document.getElementById("restartBtn");

let score = 0;
let mistakes = 0;
let timeLeft = GAME_SECONDS;
let running = false;
let tickInterval = null;

let currentInkIndex = 0;
let currentWordIndex = 0;

function randInt(max) {
	return Math.floor(Math.random() * max);
}

function pickRandomColors(count = 6) {
	const shuffled = [...ALL_NAMED_COLORS].sort(() => Math.random() - 0.5);
	return shuffled.slice(0, count).map((name) => ({
		name,
		value: name
	}));
}

function pickNewPrompt() {
	currentInkIndex = randInt(COLORS.length);
	currentWordIndex = randInt(COLORS.length);

	if (Math.random() < 0.75) {
		while (currentWordIndex === currentInkIndex) {
			currentWordIndex = randInt(COLORS.length);
		}
	}

	promptEl.textContent = COLORS[currentWordIndex].name;
	promptEl.style.color = COLORS[currentInkIndex].value;
}

function updateHUD() {
	timeEl.textContent = timeLeft;
	scoreEl.textContent = score;
	mistakesEl.textContent = mistakes;
}

function startGame() {
	if (tickInterval) {
		clearInterval(tickInterval);
		tickInterval = null;
	}

	score = 0;
	mistakes = 0;
	timeLeft = GAME_SECONDS;
	running = true;

	COLORS = pickRandomColors(6);
	buildButtons();

	updateHUD();
	overlay.classList.add("hidden");

	pickNewPrompt();

	tickInterval = setInterval(() => {
		timeLeft -= 1;
		updateHUD();
		if (timeLeft <= 0) endGame("time");
	}, 1000);
}

function buildButtons() {
	buttonsEl.innerHTML = "";

	COLORS.forEach((c, idx) => {
		const btn = document.createElement("button");
		btn.className = "colorBtn";
		btn.textContent = c.name;
		btn.style.background = c.value;
		btn.style.color = [
			"White",
			"Ivory",
			"Snow",
			"WhiteSmoke",
			"LemonChiffon",
			"LightYellow",
			"HoneyDew",
			"Azure",
			"MintCream",
			"FloralWhite"
		].includes(c.name)
			? "Black"
			: "White";

		btn.addEventListener("click", () => {
			if (!running) return;

			const correct = idx === currentInkIndex;
			flashFeedback(correct);

			if (correct) {
				score += 1;
				updateHUD();
				pickNewPrompt();
			} else {
				mistakes += 1;
				updateHUD();

				if (mistakes >= MAX_MISTAKES) {
					endGame("mistakes");
				} else {
					pickNewPrompt();
				}
			}
		});

		buttonsEl.appendChild(btn);
	});
}

function flashFeedback(isCorrect) {
	cardEl.classList.remove("correct", "wrong");

	cardEl.classList.add(isCorrect ? "correct" : "wrong");

	window.clearTimeout(flashFeedback._t);
	flashFeedback._t = window.setTimeout(() => {
		cardEl.classList.remove("correct", "wrong");
	}, 300);
}

function endGame(reason = "Time!") {
	running = false;
	clearInterval(tickInterval);
	tickInterval = null;

	endTitle.textContent =
		reason === "mistakes" ? "Do you suffer from color blindness?" : "Nice try!";
	endText.textContent = `Your score: ${score}`;
	overlay.classList.remove("hidden");
}

updateHUD();

window.addEventListener("load", startGame);
restartBtn.addEventListener("click", startGame);