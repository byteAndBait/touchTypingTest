/* 
Bugs to be fixed
    - 
Features to be Added
    - upper case for preview keyboard
    - add your own text
*/

const modifiers = ["Shift", "CapsLock" , "Tab" , "Control", "Alt", "Meta","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","F11","F12","Escape"]
let keyboard = document.querySelector(".keyboard");
let convertedText;
let textElement ;
let time = 0;
let didTimerStart = false;
let timerElement = document.querySelector(".timer");
let timer;
let isListenerBlocked = false;
function handleCustomText(text){
   convertedText = text
    .split("")
    .map((a) => (a = `<span>${a}</span>`))
    .join("");
    textElement = document.querySelector(".text");
  textElement.innerHTML = convertedText;
  textElement.firstChild.classList.add("input");
  textElement.lastChild.classList.add("last");
}

handleCustomText(`a b c d e f g h i j k l m o p q r s t u v w x y z`)


document.addEventListener("keydown", function main(e) {
  let input = textElement.querySelector(".input");
  let key = e.key;
  console.log(key)
  if(isListenerBlocked || modifiers.includes(key)){
    console.log("listener is blocked")
    return
  }
  // keyboard preview
  keyboard.querySelector(`span[data-key="${e.code}"]`).classList.add("active")


 

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
    isListenerBlocked = true
    clearInterval(timer)
    console.log(convertedText.length / time * 10 + "WPM");
  }
});

document.addEventListener("keyup", function main(e) {
  if(keyboard.querySelector(`span[data-key="${e.code}"]`)){
  keyboard.querySelector(`span[data-key="${e.code}"]`).classList.remove("active")

  }
})



// Adding custom text
let customTextContainer = document.querySelector(".customTextContainer")
let customTextWrapper = document.querySelector(".customTextWrapper") 
let addCustomTextButton = document.querySelector("button.addCustomText")
let addCustomTextOk = document.querySelector(".customTextOk") 
let addCustomTextNo = document.querySelector(".customTextNo") 
let customTextInput = document.querySelector(".customTextContainer #customTextInput")
document.addEventListener("click", (e)=>{
  if(e.target.classList.contains("custom")){
    isListenerBlocked = true
    e.preventDefault()
  }else if(e.target == addCustomTextButton){
    customTextContainer.style.cssText = "display:block" 
    customTextWrapper.style.cssText = "display:block;"
  }else{
    customTextContainer.style.cssText = "display:none" 
    customTextWrapper.style.cssText = "display:none;"
  }
  if(e.target == addCustomTextOk){
    isListenerBlocked= false;
    handleCustomText(customTextInput.value)
  }
})