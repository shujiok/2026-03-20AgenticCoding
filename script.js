const diskCountInput = document.getElementById("diskCount");
const diskCountValue = document.getElementById("diskCountValue");
const moveCountEl = document.getElementById("moveCount");
const minimumMovesEl = document.getElementById("minimumMoves");
const formulaTextEl = document.getElementById("formulaText");
const statusMessageEl = document.getElementById("statusMessage");

const resetButton = document.getElementById("resetButton");
const autoSolveButton = document.getElementById("autoSolveButton");
const stopButton = document.getElementById("stopButton");

const pegButtons = Array.from(document.querySelectorAll(".peg"));
const stackEls = [
  document.getElementById("stack-0"),
  document.getElementById("stack-1"),
  document.getElementById("stack-2")
];

let pegs = [[], [], []];
let diskCount = Number(diskCountInput.value);
let selectedPeg = null;
let moveCount = 0;
let isAutoSolving = false;
let autoStopRequested = false;
let dragSourcePeg = null;
let suppressClickUntil = 0;

const diskColors = [
  "#ff7a32",
  "#00a878",
  "#2f66ff",
  "#f25f5c",
  "#3f88c5",
  "#8f4fff",
  "#f6aa1c"
];

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function calculateMinimumMoves(n) {
  return (2 ** n) - 1;
}

function updateMathPanel() {
  const minMoves = calculateMinimumMoves(diskCount);
  minimumMovesEl.textContent = String(minMoves);
  formulaTextEl.textContent = `2^${diskCount} - 1 = ${minMoves}`;
}

function setStatusMessage(message) {
  statusMessageEl.textContent = message;
}

function clearSelection() {
  selectedPeg = null;
  pegButtons.forEach((button) => {
    button.classList.remove("selected");
    button.classList.remove("drop-target");
  });
}

function clearDropTargets() {
  pegButtons.forEach((button) => {
    button.classList.remove("drop-target");
  });
}

function renderBoard() {
  stackEls.forEach((stackEl, pegIndex) => {
    stackEl.innerHTML = "";
    pegs[pegIndex].forEach((diskSize, diskIndex) => {
      const diskEl = document.createElement("div");
      diskEl.className = "disk";
      diskEl.style.width = `${36 + (diskSize * 14)}px`;
      diskEl.style.background = diskColors[(diskSize - 1) % diskColors.length];
      diskEl.setAttribute("aria-label", `大きさ${diskSize}の円盤`);

      const isTopDisk = diskIndex === (pegs[pegIndex].length - 1);
      diskEl.dataset.peg = String(pegIndex);
      diskEl.draggable = isTopDisk && !isAutoSolving;

      if (isTopDisk && !isAutoSolving) {
        diskEl.classList.add("top-draggable");
      }

      stackEl.appendChild(diskEl);
    });
  });

  moveCountEl.textContent = String(moveCount);
}

function initializeGame() {
  diskCount = Number(diskCountInput.value);
  diskCountValue.textContent = String(diskCount);
  updateMathPanel();

  pegs = [[], [], []];
  for (let size = diskCount; size >= 1; size -= 1) {
    pegs[0].push(size);
  }

  moveCount = 0;
  clearSelection();
  renderBoard();
  setStatusMessage("左の棒をクリックしてスタート！");
}

function isValidMove(from, to) {
  if (from === to) {
    return false;
  }

  const fromPeg = pegs[from];
  const toPeg = pegs[to];

  if (fromPeg.length === 0) {
    return false;
  }

  const movingDisk = fromPeg[fromPeg.length - 1];
  const targetDisk = toPeg[toPeg.length - 1];

  return targetDisk === undefined || movingDisk < targetDisk;
}

function checkClear() {
  if (pegs[2].length !== diskCount) {
    return false;
  }

  setStatusMessage("クリア！ すごい！ぜんぶ右に運べたね！");
  return true;
}

function moveDisk(from, to, fromAuto = false) {
  if (!isValidMove(from, to)) {
    if (!fromAuto) {
      setStatusMessage("その置き方はできないよ。小さい円盤を上にしよう！");
    }
    return false;
  }

  const disk = pegs[from].pop();
  pegs[to].push(disk);
  moveCount += 1;
  renderBoard();
  checkClear();

  if (!fromAuto) {
    setStatusMessage(`移動OK！ 手数は ${moveCount} 回だよ。`);
  }

  return true;
}

function selectPeg(pegIndex) {
  if (isAutoSolving) {
    return;
  }

  if (Date.now() < suppressClickUntil) {
    return;
  }

  if (selectedPeg === null) {
    if (pegs[pegIndex].length === 0) {
      setStatusMessage("空っぽの棒は選べないよ。円盤がある棒を選んでね。");
      return;
    }

    selectedPeg = pegIndex;
    pegButtons[pegIndex].classList.add("selected");
    setStatusMessage("移動先の棒をクリックしよう。");
    return;
  }

  const moved = moveDisk(selectedPeg, pegIndex, false);
  clearSelection();

  if (!moved) {
    setStatusMessage("もう一度えらんでみよう。大きい円盤は下だけだよ。");
  }
}

function generateSolutionMoves(n, from, to, aux, output) {
  if (n === 0) {
    return;
  }

  generateSolutionMoves(n - 1, from, aux, to, output);
  output.push([from, to]);
  generateSolutionMoves(n - 1, aux, to, from, output);
}

async function autoSolve() {
  if (isAutoSolving) {
    return;
  }

  isAutoSolving = true;
  autoStopRequested = false;
  autoSolveButton.disabled = true;
  stopButton.disabled = false;
  clearSelection();

  initializeGame();
  setStatusMessage("お手本を再生中...よく見てまねしてみよう！");

  const moves = [];
  generateSolutionMoves(diskCount, 0, 2, 1, moves);

  for (const [from, to] of moves) {
    if (autoStopRequested) {
      setStatusMessage("お手本を停止しました。自分で続けてみよう！");
      break;
    }

    moveDisk(from, to, true);
    await sleep(430);
  }

  if (!autoStopRequested && pegs[2].length === diskCount) {
    setStatusMessage("お手本終了！次は自分でチャレンジしよう！");
  }

  isAutoSolving = false;
  autoSolveButton.disabled = false;
  stopButton.disabled = true;
}

function handleDiskDragStart(event) {
  if (isAutoSolving) {
    event.preventDefault();
    return;
  }

  const diskEl = event.target;
  if (!(diskEl instanceof HTMLElement) || !diskEl.draggable) {
    event.preventDefault();
    return;
  }

  const fromPeg = Number(diskEl.dataset.peg);
  if (!Number.isInteger(fromPeg)) {
    event.preventDefault();
    return;
  }

  dragSourcePeg = fromPeg;
  suppressClickUntil = Date.now() + 450;
  clearSelection();
  diskEl.classList.add("dragging");

  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/plain", String(fromPeg));
  setStatusMessage("移動先の棒にドロップしてみよう。");
}

function handleDiskDragEnd(event) {
  const diskEl = event.target;
  if (diskEl instanceof HTMLElement) {
    diskEl.classList.remove("dragging");
  }

  dragSourcePeg = null;
  clearDropTargets();
  suppressClickUntil = Date.now() + 220;
}

function handlePegDragOver(event) {
  if (isAutoSolving || dragSourcePeg === null) {
    return;
  }

  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
}

function handlePegDragEnter(event) {
  if (isAutoSolving || dragSourcePeg === null) {
    return;
  }

  const pegButton = event.currentTarget;
  if (pegButton instanceof HTMLElement) {
    pegButton.classList.add("drop-target");
  }
}

function handlePegDragLeave(event) {
  const pegButton = event.currentTarget;
  if (pegButton instanceof HTMLElement) {
    pegButton.classList.remove("drop-target");
  }
}

function handlePegDrop(event) {
  if (isAutoSolving || dragSourcePeg === null) {
    return;
  }

  event.preventDefault();
  clearDropTargets();

  const pegButton = event.currentTarget;
  if (!(pegButton instanceof HTMLElement)) {
    return;
  }

  const toPeg = Number(pegButton.dataset.peg);
  if (!Number.isInteger(toPeg)) {
    return;
  }

  const moved = moveDisk(dragSourcePeg, toPeg, false);
  if (!moved) {
    setStatusMessage("その場所には置けないよ。小さい円盤の上に置こう！");
  }

  suppressClickUntil = Date.now() + 320;
  dragSourcePeg = null;
}

document.addEventListener("dragstart", (event) => {
  const target = event.target;
  if (target instanceof HTMLElement && target.classList.contains("disk")) {
    handleDiskDragStart(event);
  }
});

document.addEventListener("dragend", (event) => {
  const target = event.target;
  if (target instanceof HTMLElement && target.classList.contains("disk")) {
    handleDiskDragEnd(event);
  }
});

pegButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const pegIndex = Number(button.dataset.peg);
    selectPeg(pegIndex);
  });
  button.addEventListener("dragover", handlePegDragOver);
  button.addEventListener("dragenter", handlePegDragEnter);
  button.addEventListener("dragleave", handlePegDragLeave);
  button.addEventListener("drop", handlePegDrop);
});

diskCountInput.addEventListener("input", () => {
  if (isAutoSolving) {
    return;
  }

  diskCountValue.textContent = diskCountInput.value;
  initializeGame();
});

resetButton.addEventListener("click", () => {
  if (isAutoSolving) {
    return;
  }

  initializeGame();
});

autoSolveButton.addEventListener("click", () => {
  autoSolve();
});

stopButton.addEventListener("click", () => {
  autoStopRequested = true;
});

initializeGame();