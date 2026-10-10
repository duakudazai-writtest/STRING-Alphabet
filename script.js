// String Alphabet reference table and translator.
// The special archive sequence is supported as a complete phrase token.
const alphabet = {
  a: "01", b: "02", c: "03", d: "04", e: "05", f: "06",
  g: "07", h: "08", i: "09", j: "10", k: "11", l: "12",
  m: "13", n: "14", o: "15", p: "16", q: "17", r: "18",
  s: "19", t: "20", u: "21", v: "22", w: "23", x: "24",
  y: "25", z: "26"
};

const phraseMap = {
  "01/15/2026,20": "i love you"
};
const reversePhraseMap = Object.fromEntries(
  Object.entries(phraseMap).map(([code, phrase]) => [phrase, code])
);

const grid = document.querySelector("#alphabet-grid");
for (const [letter, value] of Object.entries(alphabet)) {
  const cell = document.createElement("div");
  cell.className = "letter-cell";
  cell.innerHTML = `<span class="letter">${letter.toUpperCase()}</span><span class="value">${value}</span>`;
  grid.appendChild(cell);
}

let mode = "decode";
const source = document.querySelector("#source");
const result = document.querySelector("#result");
const status = document.querySelector("#status");
const modeNote = document.querySelector("#mode-note");

document.querySelectorAll(".mode").forEach(button => {
  button.addEventListener("click", () => {
    mode = button.dataset.mode;
    document.querySelectorAll(".mode").forEach(item => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    modeNote.textContent = mode === "decode" ? "String Alphabet → English" : "English → String Alphabet";
    source.placeholder = mode === "decode" ? "Enter a String Alphabet sequence" : "Enter English text";
    result.value = "";
    status.textContent = "Ready";
  });
});

function encode(text) {
  const normalized = text.toLowerCase().trim();
  if (reversePhraseMap[normalized]) return reversePhraseMap[normalized];
  return normalized.split("").map(char => {
    if (alphabet[char]) return alphabet[char];
    if (char === " ") return "/";
    return char;
  }).join(" ");
}

function decode(text) {
  const normalized = text.trim().toLowerCase();
  if (phraseMap[normalized]) return phraseMap[normalized];

  // Convert common separated number sequences to letters.
  // Slash marks a word boundary; spaces and commas separate values.
  const tokens = normalized.replace(/,/g, " ").replace(/\//g, " / ").split(/\s+/).filter(Boolean);
  return tokens.map(token => {
    if (token === "/") return " ";
    const entry = Object.entries(alphabet).find(([, value]) => value === token);
    return entry ? entry[0] : token;
  }).join("").replace(/\s+/g, " ").trim();
}

document.querySelector("#translate").addEventListener("click", () => {
  const input = source.value.trim();
  if (!input) {
    result.value = "";
    status.textContent = "Enter text to translate.";
    return;
  }
  result.value = mode === "decode" ? decode(input) : encode(input);
  status.textContent = "Translation complete";
});

document.querySelector("#clear").addEventListener("click", () => {
  source.value = "";
  result.value = "";
  status.textContent = "Ready";
  source.focus();
});

document.querySelector("#copy").addEventListener("click", async () => {
  if (!result.value) {
    status.textContent = "Nothing to copy.";
    return;
  }
  try {
    await navigator.clipboard.writeText(result.value);
    status.textContent = "Result copied.";
  } catch {
    result.focus();
    result.select();
    status.textContent = "Select the result and copy it.";
  }
});
