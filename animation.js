let buttons = document.querySelectorAll('.markbutton')
let names = document.querySelectorAll('.name')
buttons.forEach(button => {
    button.addEventListener("click",deletetask)
});
function deletetask(){
    let value = this.value-1
    console.log(value)
    names[value].classList.toggle("done")
    buttons[value].classList.toggle("buttondone")

    if(buttons[value].classList.contains("buttondone")){
        let audio = new Audio('sounds/deleted.wav')
        audio.play()
    }
   
}


