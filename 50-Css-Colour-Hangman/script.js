import * as RGBALib from "https://esm.sh/@xtia/rgba";
import { alea } from "https://esm.sh/@xtia/alea";
import { Timeline, animate } from "https://esm.sh/@xtia/timeline";
import { $, $body, SubjectEmitter } from "https://esm.sh/@xtia/jel";
const { C, RGBA } = RGBALib;
const maxLives = 13;
let activeGameInput;
const colours = ["aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige", "bisque", "black", "blanchedalmond", "blue", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue", "cornsilk", "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod", "darkgray", "darkgrey", "darkgreen", "darkkhaki", "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen", "darkslateblue", "darkslategray", "darkslategrey", "darkturquoise", "darkviolet", "deeppink", "deepskyblue", "dimgray", "dimgrey", "dodgerblue", "firebrick", "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite", "gold", "goldenrod", "gray", "grey", "green", "greenyellow", "honeydew", "hotpink", "indigo", "ivory", "khaki", "lavender", "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan", "lightgoldenrodyellow", "lightgray", "lightgrey", "lightgreen", "lightpink", "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray", "lightslategrey", "lightsteelblue", "lightyellow", "lime", "limegreen", "linen", "magenta", "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue", "mintcream", "mistyrose", "moccasin", "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange", "orangered", "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred", "papayawhip", "peachpuff", "peru", "pink", "plum", "powderblue", "purple", "rebeccapurple", "red", "rosybrown", "royalblue", "saddlebrown", "salmon", "sandybrown", "seagreen", "seashell", "sienna", "silver", "skyblue", "slateblue", "slategray", "slategrey", "snow", "springgreen", "steelblue", "tan", "teal", "thistle", "tomato", "turquoise", "violet", "wheat", "white", "whitesmoke", "yellow", "yellowgreen"];
function startGame() {
    let remainingLives = new SubjectEmitter(maxLives);
    const colourName = alea.sample(colours);
    const colour = RGBALib[colourName];
    const foreground = remainingLives
        .map((lives) => lives / maxLives)
        .map((bias) => colour.blend(C.xc8c8c8, bias));
    $body.style({
        color: foreground,
        background: C.x444
    });
    const guessed = new Set();
    const revealedLetters = Object.fromEntries([...new Set(colourName)].map((letter) => [letter, new SubjectEmitter(false)]));
    let numRevealed = 0;
    function guess(letter) {
        var _a, _b;
        if (guessed.has(letter))
            return;
        if (revealedLetters[letter]) {
            playSound(659.25, 0.15);
            ;
            (_a = revealedLetters[letter]) === null || _a === void 0 ? void 0 : _a.next(true);
            if (++numRevealed === Object.keys(revealedLetters).length) {
                playSounds((_b = melodies.get(colour)) !== null && _b !== void 0 ? _b : [[1046.50, 0.2], [1318.51, 0.25], [1567.98, 0.3]], 150);
                $body.style({
                    background: colour,
                    color: colour.lightness < .67 ? C.xfff : C.x444
                });
                restartButton.focus();
                input.remove();
            }
        }
        else {
            playSound(220, 0.25);
            remainingLives.next(remainingLives.value - 1);
            badGuessesEl.append($.span(letter));
            if (remainingLives.value === 1) {
                playSounds([[220, 0.3], [164.81, 0.4]], 300);
            }
            if (remainingLives.value == 0) {
                input.remove();
                playSounds([[392.00, 0.25], [293.66, 0.35]], 250);
            }
        }
        guessed.add(letter);
    }
    const answerEls = colourName.split("").map((letter) => $.span({
        classes: ["letter", { filled: revealedLetters[letter] }],
        content: revealedLetters[letter]
            .map((guessed) => (guessed ? animateIn(letter) : ""))
            .immediate(""),
    }));
    const badGuessesEl = $("div.bad-guesses");
    const input = $.input({
        classes: "guess-input",
        on: {
            keydown: (ev) => {
                ev.preventDefault();
                const key = ev.key.toLowerCase();
                if (/^[a-z]$/.test(key))
                    guess(key);
            }
        }
    });
    activeGameInput = input;
    const restartButton = $.button({
        content: "🔄",
        attribs: {
            title: "New"
        },
        on: {
            click: () => {
                ui.remove();
                startGame();
            }
        }
    });
    const livesIndicator = $.div({
        classes: "lives",
        content: remainingLives.map(lives => Array.from({ length: lives }, () => "❤️"))
    });
    const ui = $.div({
        classes: "ui",
        content: [$("div.word", answerEls), input, restartButton, livesIndicator, badGuessesEl]
    });
    $body.append(ui);
    input.focus();
}
$body.on("mouseup", (ev) => {
    ev.preventDefault();
    activeGameInput === null || activeGameInput === void 0 ? void 0 : activeGameInput.focus();
});
startGame();
function playSound(frequency = 440, duration = 0.1) {
    const audioContext = new window.AudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
}
function playSounds(sounds, delay) {
    const tl = new Timeline(true);
    sounds.forEach(([freq, dur]) => tl.end.delta(delay).apply(() => playSound(freq, dur)));
}
const animateIn = (content) => $.span({
    content,
    style: {
        display: 'inline-block',
        transform: animate(100).ease("easeOut").tween(.6, 0).map(s => `translateY(${s}em)`),
    }
});
const melodies = new Map();
melodies.set(RGBALib.rebeccapurple, [
    [523.25, 0.2],
    [659.25, 0.2],
    [783.99, 0.2],
    [1046.50, 0.4]
]);