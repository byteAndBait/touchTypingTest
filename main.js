/* 
Bugs to be fixed
    - 
Features to be Added
    - keyboard preview
*/

const modifiers = ["Shift", "CapsLock" , "Tab" , "Control", "Alt", "Meta"]
let keyboard = document.querySelector(".keyboard");
let text = `a b c d e f g h i j k l m o p q r s t u v w x y z`
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

  // keyboard preview
  keyboard.querySelector(`span[data-key="${e.code}"]`).classList.add("active")


  if(modifiers.includes(key)){
    e.preventDefault()
    return
  }

  // Timer
  if (!didTimerStart) {
    timer = setInterval(() => {
      time++;
      timerElement.textContent = time;
    }, 1000);
    didTimerStart = true;
    console.log("timer started");
  }

  // Backspace
  if(key == "Backspace"){
    if(input.previousElementSibling){
      input.previousElementSibling.classList.add("input")
      input.previousElementSibling.classList.remove("correct")
      input.previousElementSibling.classList.remove("false")
      input.classList.remove("input")
    }
    
    e.preventDefault()
    return
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
  } else {
      input.classList.remove("input")
        input.classList.add("false");
        if (input.nextElementSibling) {
          input.nextElementSibling.classList.add("input");
        }
  }
  if (input.classList.contains("last")) {
    document.removeEventListener("keydown", main);
    document.removeEventListener("keyup", main);
    clearInterval(timer)
    console.log(text.length / time * 10 + "WPM");
  }
});

document.addEventListener("keyup", function main(e) {
  keyboard.querySelector(`span[data-key="${e.code}"]`).classList.remove("active")
})