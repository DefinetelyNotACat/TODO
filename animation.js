let buttons = document.querySelectorAll('.markbutton')
let editbuttons = document.querySelectorAll('.editbutton')
let names = document.querySelectorAll('.name')
let rows = document.querySelectorAll('.rowdata')
let mousePointer
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
        if(names[value].children.length == 0)
        {       
           

            names[value].contentEditable = "true"
            rows[value].classList.add("icanedit")
            mousePointer = document.createElement('span')
            mousePointer.classList.toggle("cursor")
            names[value].appendChild(mousePointer)
            names[value].addEventListener("keydown",function()
            {
                hidecursor(value)
            })
   
            
       
        }
    }
}

function hidecursor(value)
{
    console.log(value)
    mousePointer.remove()
    rows[value].classList.remove("icanedit")
}



let niceinput = document.getElementById("niceinput")

niceinput.focus()