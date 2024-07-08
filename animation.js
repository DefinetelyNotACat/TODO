let buttons = document.querySelectorAll('.markbutton')
let editbuttons = document.querySelectorAll('.editbutton')
let names = document.querySelectorAll('.name')
let rows = document.querySelectorAll('.rowdata')
let buttonssize = buttons.length-1
let maxvalue = buttons[buttonssize]
console.log(maxvalue)
let mousePointer
buttons.forEach(button => {
    button.addEventListener("click",deletetask)
});
editbuttons.forEach(button => {
    button.addEventListener("click",edittask)
});

names.forEach(name =>{

})
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
            names[value].disabled = false
            names[value].focus();
            names[value].selectionStart = names[value].value.length;
            names[value].selectionEnd = names[value].value.length;           

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



function removeAllTask()
{
    let rows = document.querySelectorAll('.rowdata')
    if(rows.length != 0)
    {
        let str = "deletetable"
        maxvalue = 0
        let audio = new Audio('sounds/eraseall.wav')
        audio.play()
        rows.forEach(row => {
            row.remove()
        });
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.onload = function() 
        {
            document.getElementById("daje").innerHTML = this.responseText
        }
        xmlhttp.open("POST", "elaborator.php");
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send("request=deletetable");       
          
    }
}

