
import { createElement } from "./utils/UI/create-dom.js";

const topBar = document.getElementById("app-top-bar");

const utilityArea = createElement("div", { className: "utility-area" });
topBar?.appendChild(utilityArea);

const undoBtn = createElement("button", {
  className: "toggle"
}, [ createElement("i", { className: "ph-bold ph-arrow-arc-left" })]);
undoBtn.addEventListener("click", () => {
  if (moves.length == 0) return;
  const box = playingBox.querySelector(`#${moves.pop()}`);
  if (!box) return;
  emptyBox(box);
  swapSign();
});
utilityArea.appendChild(undoBtn);

const replayBtn = createElement("button", {
  className: "toggle"
}, [ createElement("i", { className: "ph-bold ph-arrow-counter-clockwise" })]);
replayBtn.addEventListener("click", () => {
  resetBoard();
  moves = [];
  current_sign = "x";
});
utilityArea.appendChild(replayBtn);



let current_sign = "x";

let box_state = [
  ["","",""],
  ["","",""],
  ["","",""]
]

/** @type {string[]} */
let moves = []

const playingBox = document.getElementById("playing-box")
const boxes = playingBox.querySelectorAll(".box")

boxes.forEach(box => {
  box.addEventListener("click", () => {
    if (box.hasChildNodes()) return;
    
    moves.push(box.id);
    
    const icon = document.createElement("i");
    icon.className = `ph-bold ph-${current_sign} icon expand`;
    icon.addEventListener("animationend", () => {
      icon.classList.remove("expand");
    });
    box.appendChild(icon);
    swapSign();
  });
});

function swapSign() { current_sign = current_sign == "x" ? "circle" : "x"; }

function resetBoard() {
  let delay = 0;
  boxes.forEach(box => {
    emptyBox(box, delay)
    delay += 50;
  });
}

function emptyBox(box, delay = 0) {
  const icon = box.querySelector("i");
  if (!icon) return;
  
  icon.classList.add("disappear");
  icon.style.animationDelay = `${delay}ms`;
  icon.addEventListener("animationend", () => {
    box.innerHTML = ""
    icon.style.animationDelay = "0";
    icon.classList.remove("disappear");
  }, { once: true });
}

function resetBoard2() {
  let delay = 0;
  moves.forEach(id => {
    const box = playingBox.querySelector(`#${id}`);
    if (box) {
      emptyBox(box, delay);
      delay += 100;
    }
  });
}