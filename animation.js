let buttons = document.querySelectorAll('.markbutton')
let editbuttons = document.querySelectorAll('.editbutton')
let names = document.querySelectorAll('.name')
buttons.forEach(button => {
    button.addEventListener("click",deletetask)
});
editbuttons.forEach(button => {
    button.addEventListener("click",edittask)
});
function deletetask()
{
    let value = this.value-1
    
        names[value].classList.toggle("done")
        buttons[value].classList.toggle("buttondone")
    


    if(buttons[value].classList.contains("buttondone")){
        let audio = new Audio('sounds/deleted.wav')
        audio.play()
    }
   
}

function edittask()
{
    //checka se ha preso il valore (serve per evitare conflitti) 
    if(this.value) {
        let value = this.value-1
        names[value].contentEditable = "true"
    }
}

