/* 
we need to make a typing test that measures you WPM
we have .text that has the text
we have .keyboard that has the qwerty and the preview
the text will be first converted into spans
we have three classes .correct .false .input
the .input class will be on the first span

first of all when input starts a timer start counting and when the last letter is .correct the time is up
on type check if there is a timer or not to avoid multiple timers
when keydown checks if the span the has the .input class its textcontent the same as the key
    if right 
        remove .false (when correcting the letter if typed wrong)
        it takes .correct
        remove .input 
        pass .input to the next span using nextElmentSibling
    if false
        it takes .false
every span in .keyboard has a data-key
data-key == key then give that element .typed class
and when keyup remove that class


Bugs to be fixed
    - 
Features to be Added
    - Backspace
*/

const modifiers = ["Shift", "CapsLock" , "Tab" , "Control", "Alt", "Meta"]
let keyboard = document.querySelector(".keyboard");
let text = "Hello , world"
let convertedText = text
  .split("")
  .map((a) => (a = `<span>${a}</span>`))
  .join("");
let textElement = document.querySelector(".text");
textElement.innerHTML = convertedText;
textElement.firstChild.classList.add("input");
textElement.lastChild.classList.add("last");
let time = 0;
let didTimerStart = false;
let timerElement = document.querySelector(".timer");
let timer;

document.addEventListener("keydown", function main(e) {
  let input = textElement.querySelector(".input");
  let key = e.key;
console.log(key)
  // Timer
  if (!didTimerStart) {
    timer = setInterval(() => {
      time++;
      timerElement.textContent = time;
    }, 1000);
    didTimerStart = true;
    console.log("timer started");
  }

  // actual process
  if (key == input.textContent) {
    input.classList.remove("input");
    input.classList.add("correct");
    if (input.nextElementSibling) {
      input.nextElementSibling.classList.add("input");
    }
    input.classList.remove("false");
    console.log(input.textContent);
    
    // when the last key is typed
    if (input.classList.contains("last")) {
      document.removeEventListener("keydown", main);
      clearInterval(timer)
      console.log(text.length / time * 10 + "WPM");
    }
  } else {
    if(!modifiers.includes(key)){
        input.classList.add("false");
    }
  }

});
