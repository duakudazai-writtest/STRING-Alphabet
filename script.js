// String Alphabet symbol reference and translator.
// Symbols are represented with Unicode approximations in this web version.
const letters = [
  ["A","ᛉ","Oh-ne"],["B","♙","Toh-vu"],["C","∴","Si"],["D","∶∷","Dah"],
  ["E","⋉","Fuh"],["F","⚒","Eck"],["G","◉","Vech"],["H","⊤","Hah"],
  ["I","‡","Tz"],["J","☾","Juh"],["K","⚔","Kah"],["L","♧","Luh"],
  ["M","⚯","Mih"],["N","⋏","Neh"],["O","◯","Oo"],["P","♜","Pah"],
  ["Q","◇","Kuh"],["R","؟","Ruh"],["S","≋","Seh"],["T","⟁","Tuh"],
  ["U","÷","Vuh"],["V","⋎","Vee"],["W","☉","Wah"],["X","✳","Xeh"],
  ["Y","ψ","Yuh"],["Z","卄","Zeh"]
];
const digits = [
  ["0","◇"],["1","Ⅰ"],["2","☾"],["3","⋈"],["4","∴"],
  ["5","◉"],["6","⚒"],["7","♙"],["8","⊙"],["9","↗"],
  ["10","◇Ⅰ"],["11","◇‡"],["12","≋Ⅰ"],["13","♜Ⅰ"],["14","◇‡"],
  ["15","✳Ⅰ"],["16","⋈⚒"],["17","♜‡"],["18","◇‡"],["19","≋Ⅰ"],["20","✳◇"]
];

// Phrase-level archive entries are supported as exact strings.
const archiveEntries = {
  "01/15/2010,20": "i love you",
  "01/15/2026,20": "i love you"
};
const reverseArchiveEntries = Object.fromEntries(Object.entries(archiveEntries).map(([k,v]) => [v,k]));

const alphabetEl = document.querySelector("#alphabet");
letters.forEach(([letter, symbol, pron]) => {
  const item = document.createElement("div");
  item.className = "alpha-item";
  item.innerHTML = `<span class="letter">${letter} ${letter.toLowerCase()}</span><span>→</span><span class="symbol">${symbol}</span><span class="pron">(${pron})</span>`;
  alphabetEl.appendChild(item);
});
const numbersEl = document.querySelector("#numbers");
digits.forEach(([number, symbol]) => {
  const item = document.createElement("div");
  item.className = "number-item";
  item.innerHTML = `<span>${number}</span><span>→</span><span class="symbol">${symbol}</span>`;
  numbersEl.appendChild(item);
});

let mode = "decode";
const source = document.querySelector("#source");
const result = document.querySelector("#result");
const status = document.querySelector("#status");
document.querySelectorAll(".mode").forEach(button => button.addEventListener("click", () => {
  mode = button.dataset.mode;
  document.querySelectorAll(".mode").forEach(item => {
    const active = item === button;
    item.classList.toggle("active", active);
    item.setAttribute("aria-pressed", String(active));
  });
  document.querySelector("#direction").textContent = mode === "decode" ? "String Alphabet → English" : "English → String Alphabet";
  source.placeholder = mode === "decode" ? "Enter text or a String Alphabet sequence" : "Enter English text";
  result.value = "";
  status.textContent = "Ready";
}));

function encode(text) {
  const normalized = text.trim().toLowerCase();
  if (reverseArchiveEntries[normalized]) return reverseArchiveEntries[normalized];
  const map = Object.fromEntries(letters.map(([letter,symbol]) => [letter,symbol]));
  return normalized.split("").map(char => {
    if (map[char]) return map[char];
    if (char === " ") return " / ";
    return char;
  }).join(" ");
}
function decode(text) {
  const normalized = text.trim().toLowerCase();
  if (archiveEntries[normalized]) return archiveEntries[normalized];
  const map = Object.fromEntries(letters.map(([letter,symbol]) => [symbol.toLowerCase(),letter.toLowerCase()]));
  const tokens = normalized.split(/\s+/);
  return tokens.map(token => {
    if (token === "/" || token === "|") return " ";
    return map[token] || token;
  }).join("").replace(/\s+/g," ").trim();
}
document.querySelector("#translate").addEventListener("click", () => {
  const input = source.value.trim();
  if (!input) { result.value = ""; status.textContent = "Enter text to translate."; return; }
  result.value = mode === "decode" ? decode(input) : encode(input);
  status.textContent = "Translation complete";
});
document.querySelector("#clear").addEventListener("click", () => {
  source.value = ""; result.value = ""; status.textContent = "Ready"; source.focus();
});
document.querySelector("#copy").addEventListener("click", async () => {
  if (!result.value) { status.textContent = "Nothing to copy."; return; }
  try { await navigator.clipboard.writeText(result.value); status.textContent = "Result copied."; }
  catch { result.focus(); result.select(); status.textContent = "Select the result and copy it."; }
});
