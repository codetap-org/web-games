const SVG_NS = "http://www.w3.org/2000/svg";

const TARGETS = [
  { numerator: 1, denominator: 2 },
  { numerator: 1, denominator: 3 },
  { numerator: 1, denominator: 4 },
  { numerator: 1, denominator: 5 },
  { numerator: 2, denominator: 5 },
  { numerator: 1, denominator: 6 },
  { numerator: 1, denominator: 7 },
  { numerator: 2, denominator: 7 },
  { numerator: 1, denominator: 8 },
  { numerator: 3, denominator: 8 }
];

const CONFIG = {
  rounds: 10,
  radius: 132,
  miniRadius: 19,
  tau: Math.PI * 2
};

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

class SliceGame {
  constructor() {
    this.elements = {
      svg: document.getElementById("board"),
      targetText: document.getElementById("targetText"),
      roundText: document.getElementById("roundText"),
      instruction: document.getElementById("instruction"),
      cutResult: document.getElementById("cutResult"),
      score: document.getElementById("score"),
      disc: document.getElementById("disc"),
      parts: document.getElementById("parts"),
      baseLine: document.getElementById("baseLine"),
      cutLine: document.getElementById("cutLine"),
      centre: document.getElementById("centre"),
      userSlice: document.getElementById("userSlice"),
      targetSlice: document.getElementById("targetSlice"),
      next: document.getElementById("next"),
      help: document.getElementById("help"),
      tooltip: document.getElementById("tooltip"),
      summary: document.getElementById("summary"),
      averageError: document.getElementById("averageError"),
      analysis: document.getElementById("analysis"),
      bestCut: document.getElementById("bestCut"),
      bias: document.getElementById("bias"),
      attempts: document.getElementById("attempts"),
      again: document.getElementById("again")
    };

    this.state = {
      round: 0,
      turn: 0.2,
      locked: false,
      lastTargetIndex: -1,
      target: TARGETS[0],
      history: []
    };

    this.bindEvents();
    this.start();
  }

  bindEvents() {
    const { svg, next, again, help } = this.elements;

    svg.addEventListener("pointermove", event => this.positionCut(event));
    svg.addEventListener("pointerdown", event => this.makeSlice(event));
    next.addEventListener("click", () => this.nextStep());
    again.addEventListener("click", () => this.start());
    help.addEventListener("click", event => this.toggleTooltip(event));

    document.addEventListener("pointerdown", event => {
      if (!event.target.closest(".help") && !event.target.closest(".tooltip")) {
        this.closeTooltip();
      }
    });

    window.addEventListener("keydown", event => {
      if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        this.nextStep();
      }

      if (event.key === "Escape") {
        this.closeTooltip();
      }
    });
  }

  start() {
    this.state.round = 0;
    this.state.history = [];
    this.hideSummary();
    this.nextRound();
  }

  nextStep() {
    if (this.elements.summary.classList.contains("is-visible")) return;
    if (!this.state.locked) return;

    if (this.state.round === CONFIG.rounds) {
      this.showSummary();
      return;
    }

    this.nextRound();
  }

  nextRound() {
    const targetIndex = this.getNextTargetIndex();

    this.state.round += 1;
    this.state.target = TARGETS[targetIndex];
    this.state.lastTargetIndex = targetIndex;
    this.state.turn = Math.random() > 0.5 ? 0.2 : -0.2;
    this.state.locked = false;

    this.resetBoard();
    this.renderRoundText();
    this.setCutLine(this.state.turn);
  }

  getNextTargetIndex() {
    let index = Math.floor(Math.random() * TARGETS.length);

    while (index === this.state.lastTargetIndex) {
      index = Math.floor(Math.random() * TARGETS.length);
    }

    return index;
  }

  resetBoard() {
    const {
      disc,
      baseLine,
      cutLine,
      centre,
      userSlice,
      targetSlice,
      parts,
      instruction,
      cutResult,
      score,
      next
    } = this.elements;

    disc.classList.remove("faded");
    baseLine.classList.remove("is-locked");
    cutLine.classList.remove("is-locked");
    centre.classList.remove("is-locked");
    userSlice.classList.remove("is-visible");
    targetSlice.classList.remove("is-visible");
    parts.classList.remove("is-visible");

    parts.innerHTML = "";
    userSlice.setAttribute("d", "");
    targetSlice.setAttribute("d", "");
    userSlice.style.transform = "translate(0, 0)";

    instruction.textContent = "Move the cut line. Click to slice.";
    cutResult.textContent = "";
    score.textContent = "";

    next.textContent = "Next";
    next.disabled = true;
  }

  renderRoundText() {
    const { roundText, targetText } = this.elements;
    const { round, target } = this.state;

    roundText.textContent = `Round ${round} / ${CONFIG.rounds}`;
    targetText.innerHTML = this.getFractionMarkup(target);
    targetText.setAttribute(
      "aria-label",
      `Target ${target.numerator} over ${target.denominator}`
    );
  }

  getFractionMarkup({ numerator, denominator }) {
    return `
      <span class="fraction">
        <span class="fraction__number">${numerator}</span>
        <span class="fraction__slash">/</span>
        <span class="fraction__number">${denominator}</span>
      </span>
    `;
  }

  pointFromEvent(event) {
    const point = this.elements.svg.createSVGPoint();

    point.x = event.clientX;
    point.y = event.clientY;

    return point.matrixTransform(this.elements.svg.getScreenCTM().inverse());
  }

  turnFromPoint(point) {
    const angle = Math.atan2(point.y, point.x) + Math.PI / 2;
    const rawTurn = (((angle % CONFIG.tau) + CONFIG.tau) % CONFIG.tau) / CONFIG.tau;

    return rawTurn > 0.5 ? rawTurn - 1 : rawTurn;
  }

  polar(turn, radius = CONFIG.radius) {
    const angle = turn * CONFIG.tau;

    return {
      x: Math.sin(angle) * radius,
      y: -Math.cos(angle) * radius
    };
  }

  wedgePath(startTurn, amount, direction = 1, radius = CONFIG.radius) {
    const safeAmount = clamp(amount, 0.001, 0.999);
    const endTurn = startTurn + safeAmount * direction;
    const start = this.polar(startTurn, radius);
    const end = this.polar(endTurn, radius);
    const largeArc = safeAmount > 0.5 ? 1 : 0;
    const sweep = direction > 0 ? 1 : 0;

    return [
      "M 0 0",
      `L ${start.x.toFixed(3)} ${start.y.toFixed(3)}`,
      `A ${radius} ${radius} 0 ${largeArc} ${sweep} ${end.x.toFixed(3)} ${end.y.toFixed(3)}`,
      "Z"
    ].join(" ");
  }

  setCutLine(turn) {
    const end = this.polar(clamp(turn, -0.5, 0.5));

    this.elements.cutLine.setAttribute("x2", end.x.toFixed(3));
    this.elements.cutLine.setAttribute("y2", end.y.toFixed(3));
  }

  positionCut(event) {
    if (this.state.locked) return;

    const point = this.pointFromEvent(event);

    if (Math.hypot(point.x, point.y) < 22) return;

    this.state.turn = clamp(this.turnFromPoint(point), -0.5, 0.5);
    this.setCutLine(this.state.turn);
  }

  makeSlice(event) {
    if (this.state.locked) return;

    this.positionCut(event);
    this.state.locked = true;

    const side = this.state.turn < 0 ? -1 : 1;
    const targetValue = this.getTargetValue(this.state.target);
    const userValue = Math.abs(this.state.turn);
    const signedError = (userValue - targetValue) * 100;
    const error = Math.abs(signedError);
    const userPercent = userValue * 100;
    const lift = this.polar(this.state.turn / 2, 15);

    this.renderSlice({ side, userValue, targetValue, lift });
    this.renderProofParts(side);
    this.recordAttempt({ side, userValue, targetValue, signedError, error });
    this.renderResult({ userPercent, error });
  }

  getTargetValue({ numerator, denominator }) {
    return numerator / denominator;
  }

  renderSlice({ side, userValue, targetValue, lift }) {
    const {
      disc,
      baseLine,
      cutLine,
      centre,
      userSlice,
      targetSlice
    } = this.elements;

    userSlice.setAttribute("d", this.wedgePath(0, userValue, side));
    targetSlice.setAttribute("d", this.wedgePath(0, targetValue, side));
    userSlice.style.transform = `translate(${lift.x.toFixed(3)}px, ${lift.y.toFixed(3)}px)`;

    disc.classList.add("faded");
    baseLine.classList.add("is-locked");
    cutLine.classList.add("is-locked");
    centre.classList.add("is-locked");
    userSlice.classList.add("is-visible");
    targetSlice.classList.add("is-visible");
  }

  renderProofParts(side) {
    const { parts } = this.elements;
    const { target } = this.state;
    const unit = 1 / target.denominator;

    parts.innerHTML = "";
    parts.classList.remove("is-visible");

    for (let index = 0; index < target.denominator; index += 1) {
      const part = document.createElementNS(SVG_NS, "path");
      const className = index < target.numerator ? "part is-target" : "part";

      part.setAttribute("d", this.wedgePath(index * unit * side, unit, side));
      part.setAttribute("class", className);
      part.style.setProperty("--index", index);

      parts.appendChild(part);
    }

    requestAnimationFrame(() => parts.classList.add("is-visible"));
  }

  recordAttempt({ side, userValue, targetValue, signedError, error }) {
    const { round, target, history } = this.state;

    history.push({
      round,
      side,
      userValue,
      targetValue,
      signedError,
      error,
      numerator: target.numerator,
      denominator: target.denominator
    });
  }

  renderResult({ userPercent, error }) {
    const { instruction, cutResult, score, next } = this.elements;
    const isFinalRound = this.state.round === CONFIG.rounds;

    instruction.textContent = isFinalRound ? "View your results." : "Click Next to continue.";
    cutResult.textContent = `You cut ${userPercent.toFixed(1)}%.`;
    score.textContent = `Off by ${error.toFixed(1)} pts.`;

    next.textContent = isFinalRound ? "Results" : "Next";
    next.disabled = false;
  }

  showSummary() {
    const { history } = this.state;
    const average = this.average(history.map(item => item.error));
    const signedAverage = this.average(history.map(item => item.signedError));
    const best = history.reduce(
      (bestItem, item) => item.error < bestItem.error ? item : bestItem,
      history[0]
    );

    this.elements.averageError.textContent = `${average.toFixed(1)} pts`;
    this.elements.bestCut.textContent = `${best.error.toFixed(1)} pts`;
    this.elements.bias.textContent = `${signedAverage >= 0 ? "+" : ""}${signedAverage.toFixed(1)} pts`;
    this.elements.analysis.textContent = this.getAnalysis(average, signedAverage);

    this.renderAttempts();

    this.elements.summary.hidden = false;
    requestAnimationFrame(() => this.elements.summary.classList.add("is-visible"));
  }

  hideSummary() {
    this.elements.summary.classList.remove("is-visible");
    this.elements.summary.hidden = true;
  }

  average(values) {
    return values.reduce((sum, value) => sum + value, 0) / values.length;
  }

  getAnalysis(averageError, signedAverage) {
    if (averageError <= 2) {
      return "Very accurate overall. Your cuts stayed close to the targets.";
    }

    if (Math.abs(signedAverage) > averageError * 0.55) {
      return signedAverage > 0
        ? "You tended to cut too large. Aim slightly smaller next round."
        : "You tended to cut too small. Give each slice a little more room.";
    }

    return "Your misses were balanced. The main pattern was consistency, not direction.";
  }

  renderAttempts() {
    const { attempts } = this.elements;

    attempts.innerHTML = "";

    this.state.history.forEach(attempt => {
      const item = document.createElement("div");
      const userPath = this.wedgePath(0, attempt.userValue, attempt.side, CONFIG.miniRadius);
      const targetPath = this.wedgePath(0, attempt.targetValue, attempt.side, CONFIG.miniRadius);

      item.className = "attempt";
      item.innerHTML = `
        <svg viewBox="-26 -26 52 52" aria-label="Round ${attempt.round}">
          <circle r="${CONFIG.miniRadius}"></circle>
          <path class="mini-user" d="${userPath}"></path>
          <path class="mini-target" d="${targetPath}"></path>
        </svg>
        <span>${attempt.error.toFixed(1)} pts</span>
      `;

      attempts.appendChild(item);
    });
  }

  toggleTooltip(event) {
    event.stopPropagation();

    const isOpen = !this.elements.tooltip.classList.contains("open");

    this.elements.tooltip.classList.toggle("open", isOpen);
    this.elements.help.setAttribute("aria-expanded", String(isOpen));
  }

  closeTooltip() {
    this.elements.tooltip.classList.remove("open");
    this.elements.help.setAttribute("aria-expanded", "false");
  }
}

new SliceGame();