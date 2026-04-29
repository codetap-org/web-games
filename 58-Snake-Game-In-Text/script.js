import { layoutNextLine, prepareWithSegments } from "https://esm.sh/@chenglou/pretext@0.0.3";

/** Must match `prepareWithSegments` (canvas and DOM). */
const FONT = '400 20px "Courier New", Courier, ui-monospace, monospace';
const LINE_HEIGHT = 28;

const STAGE_W = 896;
const STAGE_H = 672;
const REGION = { x: 14, y: 14, w: STAGE_W - 28, h: STAGE_H - 28 };

/** Distance between segment centers — should be ≥ ~2×R_BODY so circles do not overlap. */
const STEP = 28;
/** Base tick interval; actual interval drops slightly with score (see `tickMsForScore`). */
const TICK_MS_BASE = 54;
/** Fastest tick (ms) at high score — keeps late game playable, not frantic. */
const TICK_MS_MIN = 30;
/** Ms shaved off the tick per apple eaten (capped by MIN). */
const TICK_MS_PER_APPLE = 0.75;
/** Milliseconds until auto-respawn after death. */
const DEATH_SCREEN_MS = 1650;
/** Pixel tolerance — same-cell collision (avoid float / rounding issues). */
const COLLIDE_EPS = 1.25;
const R_HEAD = 18;
const R_BODY = 12;
/** Pickup radius + spawn margin — not a layout obstacle anymore. */
const R_APPLE = 28;
const APPLE_LABEL = "apple";
/** Bold like `.apple-label` — only for measuring label width. */
const APPLE_FONT = '700 20px "Courier New", Courier, ui-monospace, monospace';
/** H/v padding when carving the line band for a circle (larger = more gap between text and snake). */
const CIRCLE_H_PAD = 32;
const CIRCLE_V_PAD = 22;
const START_SEGMENTS = 4;
/**
 * Slots narrower than this are dropped — too high a value leaves an empty right column in a narrow band beside obstacles.
 */
const MIN_SLOT_WIDTH = 28;
/** Extra px around the word width in the layout carve-out. */
const APPLE_H_PAD_PX = 2;

const CORPUS_PARA = `
The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.
How vexingly quick daft zebras jump. Sphinx of black quartz judge my vow.
Bright vixens jump dozy fowl quacking. Waltz bad nymph for quick jigs vex.
Cozy lummox gives smart squid who asks for job pen. The five boxing wizards jump quickly.
Jaded zombies acted quaintly but kept driving their oxen forward. Grumpy wizards make toxic brew.
`.
replace(/\s+/g, " ").
trim();

/** Repeated corpus so the arena stays text-dense as the snake carves through it. */
const CORPUS = Array.from({ length: 6 }, () => CORPUS_PARA).join(" ");

function carveTextLineSlots(base, blocked) {
  let slots = [base];
  for (let bi = 0; bi < blocked.length; bi++) {
    const iv = blocked[bi];
    const next = [];
    for (let si = 0; si < slots.length; si++) {
      const s = slots[si];
      if (iv.right <= s.left || iv.left >= s.right) {
        next.push(s);
        continue;
      }
      if (iv.left > s.left) next.push({ left: s.left, right: iv.left });
      if (iv.right < s.right) next.push({ left: iv.right, right: s.right });
    }
    slots = next;
  }
  return slots.filter(s => s.right - s.left >= MIN_SLOT_WIDTH);
}

function circleIntervalForBand(cx, cy, r, bandTop, bandBottom, hPad, vPad) {
  const top = bandTop - vPad;
  const bottom = bandBottom + vPad;
  if (top >= cy + r || bottom <= cy - r) return null;
  const minDy = cy >= top && cy <= bottom ? 0 : cy < top ? top - cy : cy - bottom;
  if (minDy >= r) return null;
  const maxDx = Math.sqrt(r * r - minDy * minDy);
  return { left: cx - maxDx - hPad, right: cx + maxDx + hPad };
}

function getRectIntervalsForBand(rects, bandTop, bandBottom) {
  const out = [];
  for (let ri = 0; ri < rects.length; ri++) {
    const r = rects[ri];
    if (bandBottom <= r.y || bandTop >= r.y + r.h) continue;
    out.push({ left: r.x, right: r.x + r.w });
  }
  return out;
}

/** Each line: blocked → slots → `layoutNextLine` per slot (sorted left to right). */
function layoutColumn(
prepared,
startCursor,
regionX,
regionY,
regionW,
regionH,
lineHeight,
circleObs,
rectObstacles)
{
  let cursor = startCursor;
  let lineTop = regionY;
  const lines = [];

  while (lineTop + lineHeight <= regionY + regionH) {
    const bandTop = lineTop;
    const bandBottom = lineTop + lineHeight;
    const blocked = [];

    for (let oi = 0; oi < circleObs.length; oi++) {
      const c = circleObs[oi];
      const iv = circleIntervalForBand(
      c.cx,
      c.cy,
      c.r,
      bandTop,
      bandBottom,
      c.hPad,
      c.vPad);

      if (iv !== null) blocked.push(iv);
    }
    blocked.push(...getRectIntervalsForBand(rectObstacles, bandTop, bandBottom));

    const slots = carveTextLineSlots({ left: regionX, right: regionX + regionW }, blocked);
    if (slots.length === 0) {
      lineTop += lineHeight;
      continue;
    }

    slots.sort((a, b) => a.left - b.left);
    for (let si = 0; si < slots.length; si++) {
      const slot = slots[si];
      const slotWidth = slot.right - slot.left;
      let line = layoutNextLine(prepared, cursor, slotWidth);
      if (line === null) {
        cursor = { segmentIndex: 0, graphemeIndex: 0 };
        line = layoutNextLine(prepared, cursor, slotWidth);
        if (line === null) {
          return { lines, cursor };
        }
      }
      lines.push({
        x: Math.round(slot.left),
        y: Math.round(lineTop),
        text: line.text,
        slotW: Math.round(slotWidth) });

      cursor = line.end;
    }
    lineTop += lineHeight;
  }

  return { lines, cursor };
}

function dist(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.hypot(dx, dy);
}

function clamp(v, lo, hi) {
  return Math.max(lo, Math.min(hi, v));
}

function tickMsForScore(s) {
  return Math.max(TICK_MS_MIN, Math.round(TICK_MS_BASE - s * TICK_MS_PER_APPLE));
}

function createLayoutFontMetrics(mainFont, appleFont) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  return {
    lineWidth(text) {
      ctx.font = mainFont;
      return ctx.measureText(text).width;
    },
    appleWidth() {
      ctx.font = appleFont;
      return ctx.measureText(APPLE_LABEL).width;
    } };

}

function escapeHtml(s) {
  return s.
  replace(/&/g, "&amp;").
  replace(/</g, "&lt;").
  replace(/>/g, "&gt;").
  replace(/"/g, "&quot;");
}

function buildCompositeParts(sorted, appleRect, lw) {
  if (sorted.length === 0) return [{ kind: "apple" }];
  const parts = [];
  let i = 0;
  while (i < sorted.length) {
    const L = sorted[i];
    // Fragment right edge (canvas) stays left of the apple box; no letter-spacing in CSS to match measurement.
    if (L.x + lw(L.text) <= appleRect.x + 0.25) {
      parts.push({ kind: "frag", line: L });
      i++;
    } else break;
  }
  parts.push({ kind: "apple" });
  while (i < sorted.length) {
    parts.push({ kind: "frag", line: sorted[i] });
    i++;
  }
  return parts;
}

function buildTextRenderRows(lines, appleRect, m) {
  const byY = new Map();
  for (const L of lines) {var _byY$get;
    const arr = (_byY$get = byY.get(L.y)) !== null && _byY$get !== void 0 ? _byY$get : [];
    arr.push(L);
    byY.set(L.y, arr);
  }
  const ys = [...byY.keys()].sort((a, b) => a - b);
  const out = [];
  for (const y of ys) {
    const row = byY.get(y);
    row.sort((a, b) => a.x - b.x);
    if (y !== appleRect.y) {
      for (const L of row) out.push({ mode: "simple", line: L });
    } else {
      out.push({
        mode: "composite",
        appleRect,
        parts: buildCompositeParts(row, appleRect, t => m.lineWidth(t)) });

    }
  }
  return out;
}

function compositeLineInnerHtml(parts, appleRect) {
  const regionRight = REGION.x + REGION.w;
  const chunks = [];
  for (let pi = 0; pi < parts.length; pi++) {
    const p = parts[pi];
    if (p.kind === "frag") {
      const L = p.line;
      const left = Math.round(L.x - REGION.x);
      let rightBound = regionRight;
      for (let j = pi + 1; j < parts.length; j++) {
        const q = parts[j];
        if (q.kind === "apple") {
          rightBound = appleRect.x;
          break;
        }
        if (q.kind === "frag") {
          rightBound = q.line.x;
          break;
        }
      }
      const width = Math.max(1, Math.round(rightBound - L.x));
      chunks.push(
      `<span class="pretext-frag" style="left:${left}px;width:${width}px">${escapeHtml(L.text)}</span>`);

    } else {
      const left = Math.round(appleRect.x - REGION.x);
      const w = Math.round(appleRect.w);
      chunks.push(
      `<span class="apple-token" data-pretext-apple="true" style="left:${left}px;width:${w}px">${escapeHtml(APPLE_LABEL)}</span>`);

    }
  }
  return chunks.join("");
}

function appleCarveWidth(m) {
  return Math.ceil(m.appleWidth()) + APPLE_H_PAD_PX * 2;
}

/**
 * Initial estimate: narrow rectangle centered on the in-game position (first layout pass).
 */
function appleLayoutRectFromGame(apple, m) {
  const maxRow = Math.max(0, Math.floor(REGION.h / LINE_HEIGHT) - 1);
  const row = clamp(Math.floor((apple.y - REGION.y) / LINE_HEIGHT), 0, maxRow);
  const lineY = REGION.y + row * LINE_HEIGHT;

  const w = appleCarveWidth(m);
  let x = Math.round(apple.x - w / 2);
  const leftBound = Math.round(REGION.x);
  const rightBound = Math.round(REGION.x + REGION.w - w);
  x = clamp(x, leftBound, Math.max(leftBound, rightBound));

  return { x, y: lineY, w, h: LINE_HEIGHT };
}

/**
 * After the first layout: center the carve-out in the real gap between green fragments
 * so the label does not sit in a wide empty band beside the text.
 */
function snapAppleRectToTextGap(lines, lineY, gap, carveW, lw) {
  const gapL = gap.x;
  const gapR = gap.x + gap.w;
  const row = lines.filter(L => L.y === lineY).sort((a, b) => a.x - b.x);

  let maxLeft = REGION.x;
  let anyLeft = false;
  let minRight = REGION.x + REGION.w;
  let anyRight = false;

  for (const L of row) {
    const re = L.x + lw(L.text);
    if (re <= gapL + 1) {
      maxLeft = Math.max(maxLeft, re);
      anyLeft = true;
    }
    if (L.x >= gapR - 1) {
      minRight = Math.min(minRight, L.x);
      anyRight = true;
    }
  }

  if (!anyLeft) maxLeft = gapL;
  if (!anyRight) minRight = gapR;

  const avail = minRight - maxLeft;
  if (avail < carveW) return gap;

  const cx = (maxLeft + minRight) / 2;
  let x = Math.round(cx - carveW / 2);
  x = clamp(x, REGION.x, REGION.x + REGION.w - carveW);
  return { x, y: lineY, w: carveW, h: LINE_HEIGHT };
}

function appleRectCenter(r) {
  return { x: r.x + r.w / 2, y: r.y + r.h / 2 };
}

function placeApple(snake, margin) {
  const m = margin + R_APPLE + 8;
  for (let attempt = 0; attempt < 80; attempt++) {
    const p = {
      x: REGION.x + m + Math.random() * (REGION.w - 2 * m),
      y: REGION.y + m + Math.random() * (REGION.h - 2 * m) };

    let ok = true;
    for (let i = 0; i < snake.length; i++) {
      if (dist(p, snake[i]) < R_HEAD + R_APPLE + 18) {
        ok = false;
        break;
      }
    }
    if (ok) return p;
  }
  return { x: REGION.x + REGION.w * 0.72, y: REGION.y + REGION.h * 0.35 };
}

function syncLinePool(pool, count, parent) {
  while (pool.length < count) {
    const el = document.createElement("div");
    el.className = "pretext-line";
    parent.appendChild(el);
    pool.push(el);
  }
  for (let i = 0; i < pool.length; i++) {
    pool[i].style.display = i < count ? "block" : "none";
  }
}

function syncSnakePool(pool, count, parent) {
  while (pool.length < count) {
    const el = document.createElement("div");
    el.className = "snake-segment snake-segment--body";
    parent.appendChild(el);
    pool.push(el);
  }
  while (pool.length > count) {
    const el = pool.pop();
    el.remove();
  }
}

function main() {
  const prepared = prepareWithSegments(CORPUS, FONT);

  const app = document.getElementById("app");
  if (!app) throw new Error("#app");

  app.innerHTML = `
    <div class="panel">
      <h1>Snake</h1>
      <div class="stats">
        <span>Apples: <strong id="score">0</strong></span>
        <span>Length: <strong id="len">${START_SEGMENTS}</strong></span>
      </div>
      <div class="stage-wrap"></div>
    </div>
  `;

  const statsEl = app.querySelector(".stats");
  const wrap = app.querySelector(".stage-wrap");
  const stage = document.createElement("div");
  stage.className = "stage";
  stage.tabIndex = 0;
  stage.setAttribute("role", "application");
  stage.setAttribute("aria-label", "Snake");
  stage.style.width = `${STAGE_W}px`;
  stage.style.height = `${STAGE_H}px`;

  const textLayer = document.createElement("div");
  textLayer.className = "text-layer";
  const obstacleLayer = document.createElement("div");
  obstacleLayer.className = "obstacle-layer";

  const headEl = document.createElement("div");
  headEl.className = "snake-segment snake-segment--head";
  obstacleLayer.appendChild(headEl);

  const gameOverLayer = document.createElement("div");
  gameOverLayer.className = "game-over-layer";
  gameOverLayer.setAttribute("aria-hidden", "true");
  gameOverLayer.innerHTML = `
    <p class="game-over-title">Game over</p>
    <p class="game-over-hint">Space or Enter</p>
  `;

  stage.append(textLayer, obstacleLayer, gameOverLayer);
  wrap.appendChild(stage);

  const linePool = [];
  const bodyPool = [];
  const fontMetrics = createLayoutFontMetrics(FONT, APPLE_FONT);

  let dir = { x: 1, y: 0 };
  let pendingDir = null;
  let head = { x: REGION.x + 88, y: REGION.y + REGION.h * 0.45 };
  let trail = [];
  let segmentCount = START_SEGMENTS;
  let apple = placeApple([head], 0);
  let score = 0;
  /** Apple hit-test rectangle after the latest layout pass. */
  let lastAppleHitRect = appleLayoutRectFromGame(apple, fontMetrics);
  /** 0 = playing; >0 = auto-respawn time (ms). */
  let respawnAt = 0;

  const scoreEl = app.querySelector("#score");
  const lenEl = app.querySelector("#len");

  let pickupFxTimer;

  function playPickupFx() {
    if (pickupFxTimer !== undefined) {
      clearTimeout(pickupFxTimer);
    }
    stage.classList.remove("stage--pickup");
    wrap.classList.remove("stage-wrap--pickup");
    statsEl.classList.remove("stats--pickup");
    void stage.offsetWidth;
    stage.classList.add("stage--pickup");
    wrap.classList.add("stage-wrap--pickup");
    statsEl.classList.add("stats--pickup");
    pickupFxTimer = window.setTimeout(() => {
      stage.classList.remove("stage--pickup");
      wrap.classList.remove("stage-wrap--pickup");
      statsEl.classList.remove("stats--pickup");
      pickupFxTimer = undefined;
    }, 420);
  }

  function resetGame() {
    trail = [];
    segmentCount = START_SEGMENTS;
    score = 0;
    head = { x: REGION.x + 88, y: REGION.y + REGION.h * 0.45 };
    apple = placeApple([head], 0);
    lastAppleHitRect = appleLayoutRectFromGame(apple, fontMetrics);
    dir = { x: 1, y: 0 };
    pendingDir = null;
    respawnAt = 0;
    scoreEl.textContent = "0";
    lenEl.textContent = String(segmentCount);
    stage.classList.remove("stage--dead");
    gameOverLayer.classList.remove("is-visible");
    gameOverLayer.setAttribute("aria-hidden", "true");
    headEl.classList.remove("snake-segment--dead");
    if (pickupFxTimer !== undefined) {
      clearTimeout(pickupFxTimer);
      pickupFxTimer = undefined;
    }
    stage.classList.remove("stage--pickup");
    wrap.classList.remove("stage-wrap--pickup");
    statsEl.classList.remove("stats--pickup");
  }

  function die() {
    const now = performance.now();
    if (respawnAt > now) return;
    respawnAt = performance.now() + DEATH_SCREEN_MS;
    stage.classList.add("stage--dead");
    gameOverLayer.classList.add("is-visible");
    gameOverLayer.setAttribute("aria-hidden", "false");
    headEl.classList.add("snake-segment--dead");
  }

  function snakeChain() {
    const chain = [head];
    for (let i = 0; i < segmentCount - 1 && i < trail.length; i++) {
      chain.push(trail[i]);
    }
    return chain;
  }

  function buildCircleObs(chain) {
    const obs = [];
    for (let i = 0; i < chain.length; i++) {
      const p = chain[i];
      obs.push({
        cx: p.x,
        cy: p.y,
        r: i === 0 ? R_HEAD : R_BODY,
        hPad: CIRCLE_H_PAD,
        vPad: CIRCLE_V_PAD });

    }
    return obs;
  }

  function renderFrame() {
    const chain = snakeChain();
    const circleObs = buildCircleObs(chain);
    let appleRect = appleLayoutRectFromGame(apple, fontMetrics);
    const carveW = appleCarveWidth(fontMetrics);
    const lw = t => fontMetrics.lineWidth(t);

    let { lines } = layoutColumn(
    prepared,
    { segmentIndex: 0, graphemeIndex: 0 },
    REGION.x,
    REGION.y,
    REGION.w,
    REGION.h,
    LINE_HEIGHT,
    circleObs,
    [appleRect]);


    const snapped = snapAppleRectToTextGap(lines, appleRect.y, appleRect, carveW, lw);
    if (Math.abs(snapped.x - appleRect.x) >= 1) {
      appleRect = snapped;
      ({ lines } = layoutColumn(
      prepared,
      { segmentIndex: 0, graphemeIndex: 0 },
      REGION.x,
      REGION.y,
      REGION.w,
      REGION.h,
      LINE_HEIGHT,
      circleObs,
      [appleRect]));

    }

    lastAppleHitRect = appleRect;

    const textRows = buildTextRenderRows(lines, appleRect, fontMetrics);
    syncLinePool(linePool, textRows.length, textLayer);
    for (let i = 0; i < textRows.length; i++) {
      const el = linePool[i];
      const row = textRows[i];
      if (row.mode === "simple") {
        const L = row.line;
        el.className = "pretext-line pretext-line--justified";
        el.style.width = `${L.slotW}px`;
        el.style.height = "";
        el.textContent = L.text;
        el.style.left = `${L.x}px`;
        el.style.top = `${L.y}px`;
        el.style.font = FONT;
      } else {
        el.className = "pretext-line pretext-line--composite";
        el.style.left = `${REGION.x}px`;
        el.style.top = `${row.appleRect.y}px`;
        el.style.width = `${REGION.w}px`;
        el.style.height = `${LINE_HEIGHT}px`;
        el.style.font = FONT;
        el.innerHTML = compositeLineInnerHtml(row.parts, row.appleRect);
      }
    }

    headEl.style.left = `${head.x}px`;
    headEl.style.top = `${head.y}px`;
    headEl.style.width = `${R_HEAD * 2}px`;
    headEl.style.height = `${R_HEAD * 2}px`;

    const bodyCount = Math.max(0, chain.length - 1);
    syncSnakePool(bodyPool, bodyCount, obstacleLayer);
    for (let b = 0; b < bodyCount; b++) {
      const p = chain[b + 1];
      const el = bodyPool[b];
      el.className =
      b % 2 === 0 ?
      "snake-segment snake-segment--body" :
      "snake-segment snake-segment--body snake-segment--body-alt";
      el.style.left = `${p.x}px`;
      el.style.top = `${p.y}px`;
      el.style.width = `${R_BODY * 2}px`;
      el.style.height = `${R_BODY * 2}px`;
    }
  }

  function opposite(a, b) {
    return a.x === -b.x && a.y === -b.y && (a.x !== 0 || a.y !== 0);
  }

  function snakeTick() {
    if (respawnAt !== 0) return;

    if (pendingDir !== null && !opposite(pendingDir, dir)) dir = pendingDir;
    pendingDir = null;

    const nx = head.x + dir.x * STEP;
    const ny = head.y + dir.y * STEP;
    const minX = REGION.x + R_HEAD;
    const maxX = REGION.x + REGION.w - R_HEAD;
    const minY = REGION.y + R_HEAD;
    const maxY = REGION.y + REGION.h - R_HEAD;

    if (nx < minX || nx > maxX || ny < minY || ny > maxY) {
      die();
      return;
    }

    const next = { x: nx, y: ny };

    const chainBefore = snakeChain();
    // Integer px; skip the last segment (tail moves next tick) for self-collision.
    const tailIdx = chainBefore.length - 1;
    for (let i = 1; i < chainBefore.length; i++) {
      if (i === tailIdx) continue;
      const seg = chainBefore[i];
      if (
      Math.abs(next.x - seg.x) < COLLIDE_EPS &&
      Math.abs(next.y - seg.y) < COLLIDE_EPS)
      {
        die();
        return;
      }
    }

    trail.unshift({ ...head });
    trail = trail.slice(0, segmentCount * 8);

    head = next;

    if (dist(head, appleRectCenter(lastAppleHitRect)) < R_HEAD + R_APPLE) {
      score++;
      segmentCount++;
      apple = placeApple(snakeChain(), 0);
      scoreEl.textContent = String(score);
      lenEl.textContent = String(segmentCount);
      playPickupFx();
    }
  }

  const onKeyDown = e => {
    let d = null;
    if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") d = { x: 0, y: -1 };else
    if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") d = { x: 0, y: 1 };else
    if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") d = { x: -1, y: 0 };else
    if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") d = { x: 1, y: 0 };
    if (d) {
      e.preventDefault();
      if (respawnAt === 0) pendingDir = d;
    }
    if (e.key === " " || e.key === "Enter") {
      if (respawnAt > performance.now()) {
        e.preventDefault();
        resetGame();
      }
    }
  };
  window.addEventListener("keydown", onKeyDown);

  const onStagePointerDown = () => {
    stage.focus({ preventScroll: true });
  };
  stage.addEventListener("pointerdown", onStagePointerDown);

  let tickAccum = 0;
  let last = performance.now();
  let rafId = 0;
  let rafRunning = true;

  function frame(now) {
    if (!rafRunning) return;
    const t = performance.now();
    if (respawnAt > 0 && t >= respawnAt) resetGame();

    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    tickAccum += dt * 1000;
    while (tickAccum >= tickMsForScore(score)) {
      tickAccum -= tickMsForScore(score);
      if (respawnAt === 0) snakeTick();
    }
    renderFrame();
    if (rafRunning) rafId = requestAnimationFrame(frame);
  }

  rafId = requestAnimationFrame(frame);
}

main();