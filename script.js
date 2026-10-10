const letters = {
a:["λ","Oh-ne"],b:["♧","Toh-vu"],c:["∴","Si"],d:["∷","Dah"],e:["⋊","Fuh"],f:["╫","Eck"],g:["◉","Vech"],h:["⊥","Hah"],i:["‡","Tz"],j:["☾","Juh"],k:["⋈","Kah"],l:["♩","Luh"],m:["⋏","Mih"],
n:["⋋","Neh"],o:["◯","Oo"],p:["ϯ","Pah"],q:["◇","Kuh"],r:["¿","Ruh"],s:["≋","Seh"],t:["⟁","Tuh"],u:["÷","Vuh"],v:["Ⅴ","Vee"],w:["☉","Wah"],x:["✳","Xeh"],y:["ψ","Yuh"],z:["卌","Zeh"]
};
const digits = {"0":"◇","1":"Ⅰ","2":"☾","3":"≋","4":"∴","5":"◉","6":"⋈","7":"♧","8":"⊙","9":"↗"};
const reverseLetters = Object.fromEntries(Object.entries(letters).map(([k,v])=>[v[0],k]));
const reverseDigits = Object.fromEntries(Object.entries(digits).map(([k,v])=>[v,k]));
const source = document.querySelector("#sourceText"), output = document.querySelector("#outputText");
let mode = "english";
function encode(text){return [...text].map(ch=>{const low=ch.toLowerCase();if(letters[low]){const sym=letters[low][0];return ch===low?sym:sym;}if(digits[ch])return digits[ch];return ch;}).join("");}
function decode(text){return [...text].map(ch=>reverseLetters[ch]||reverseDigits[ch]||ch).join("");}
function special(text){return text.trim()==="01/15/2010,20" ? "I love you" : null;}
function hiddenMeaning(text){
 const t=text.trim().toLowerCase().replace(/[.!?]+$/,"");
 const meanings={
 "i love you":"“I love you” — a confession hidden in plain sight.",
 "thank you":"“I'll always remember your kindness.”",
 "my favourite colour is blue":"“You're my favourite person.”",
 "my favorite color is blue":"“You're my favourite person.”",
 "i miss you":"“A part of my day still waits for you.”",
 "goodbye":"“I'll find you again.” — or “This is the end.”",
 "i hate you":"“I'm afraid of losing you.”"
 };
 return meanings[t]||"In String lore, the literal words may conceal a private feeling known only to the sender and reader.";
}
function translate(){
 const val=source.value;
 if(mode==="english"){
   output.textContent=encode(val);
   document.querySelector("#outputLabel").innerHTML='STRING TRANSLATION <span>02</span>';
   document.querySelector("#translationNote").textContent="A message between the lines.";
 }else{
   const s=special(val);
   output.textContent=s||decode(val);
   document.querySelector("#outputLabel").innerHTML='ENGLISH READING <span>02</span>';
   document.querySelector("#translationNote").textContent=s?"Archive legend detected.":"Decoded using the current cipher key.";
 }
 document.querySelector("#charCount").textContent=`${val.length} character${val.length===1?"":"s"}`;
 document.querySelector("#meaningText").textContent=mode==="english"?hiddenMeaning(val):"The archive warns that a decoded sentence may carry a second, personal meaning.";
}
function setMode(next){
 mode=next;
 document.querySelectorAll(".lang").forEach(b=>b.classList.toggle("active",b.dataset.mode===mode));
 document.querySelector("#sourceLabel").innerHTML=(mode==="english"?'YOUR MESSAGE':'STRING GLYPHS')+' <span>01</span>';
 document.querySelector("#modeNote").textContent=mode==="english"?"Letters become symbols. The meaning may become something more.":"Read the symbols back into letters—or try the archive's date legend.";
 translate();
}
document.querySelectorAll(".lang").forEach(b=>b.addEventListener("click",()=>setMode(b.dataset.mode)));
document.querySelector("#swapBtn").addEventListener("click",()=>setMode(mode==="english"?"string":"english"));
document.querySelector("#translateBtn").addEventListener("click",translate);
source.addEventListener("input",translate);
document.querySelector("#clearBtn").addEventListener("click",()=>{source.value="";translate();source.focus();});
document.querySelector("#copyBtn").addEventListener("click",async()=>{try{await navigator.clipboard.writeText(output.textContent);document.querySelector("#copyBtn").textContent="COPIED ✓";setTimeout(()=>document.querySelector("#copyBtn").textContent="COPY ↗",1300);}catch(e){document.querySelector("#copyBtn").textContent="SELECT TO COPY";}});
document.querySelectorAll("[data-example]").forEach(b=>b.addEventListener("click",()=>{source.value=b.dataset.example;setMode("english");translate();document.querySelector("#translator").scrollIntoView({behavior:"smooth",block:"start"});}));
document.querySelector("#themeToggle").addEventListener("click",()=>document.body.classList.toggle("light"));
const alphaGrid=document.querySelector("#alphabetGrid");
Object.entries(letters).forEach(([letter,data])=>{const el=document.createElement("div");el.className="glyph-card";el.innerHTML=`<span class="glyph-letter">${letter.toUpperCase()}</span><span class="glyph-symbol">${data[0]}</span><span class="glyph-pronounce">${data[1]}</span>`;alphaGrid.appendChild(el);});
const numGrid=document.querySelector("#numberGrid");
Object.entries(digits).forEach(([num,symbol])=>{const el=document.createElement("div");el.className="glyph-card";el.innerHTML=`<span class="glyph-letter">${num}</span><span class="glyph-symbol">${symbol}</span>`;numGrid.appendChild(el);});
translate();