let buttons = document.querySelectorAll('.markbutton')
let editbuttons = document.querySelectorAll('.editbutton')
let names = document.querySelectorAll('.name')
let rows = document.querySelectorAll('.rowdata')
let buttonssize = buttons.length-1
let containerrow = document.querySelector('.containerrows')
let maxvalue = buttons[buttonssize]
let checkiffirst = false
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
    let names = document.querySelectorAll(".name")
    let buttons = document.querySelectorAll(".markbutton")

    let value = this.value-1
    console.log(value)
    console.log(names[value])
   
    
        names[value].classList.toggle("done")
        buttons[value].classList.toggle("buttondone")
    
       
    


    if(buttons[value].classList.contains("buttondone")){
        let audio = new Audio('sounds/deleted.wav')
        audio.play()
    }
   
}

function edittask()
{
    let names = document.querySelectorAll(".name")
    let buttons = document.querySelectorAll(".markbutton")

    if(this.value) 
    {
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
            names[value].addEventListener("keydown",function(){
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
        //let str = "deletetable"
        maxvalue = 0
        let audio = new Audio('sounds/eraseall.wav')
        audio.play()
        rows.forEach(row => {
            row.remove()
        });
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.onload = function() 
        {
        }
        xmlhttp.open("POST", "elaborator.php");
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send("request=deletetable");       
          
    }
}


function addTask()
{
    let maxvalue
    let buttons = document.querySelectorAll('.markbutton')
    if(buttons.length!==0)
    {
        console.log("sborra")    
        let buttonssize = buttons.length-1
        maxvalue = buttons[buttonssize].value
        console.log("Il max è ",maxvalue)
        addRow(maxvalue)
    }
    else
    {
        maxvalue = 1
        addRow(maxvalue)

    }

}


function addRow(value)
{
    let buttons = document.querySelectorAll('.markbutton')
    if(buttons.length==0){

        value = 1
    }   
    else value = parseInt(value) + 1
    console.log("m piac sto value " + value)

    let div = document.createElement('div')
    div.classList.add("rowdata")
    console.log(containerrow)
    let input = document.createElement('input')
    input.setAttribute("type", "text")
    input.classList.add("name")
    div.appendChild(input)
    containerrow.appendChild(div)
    let seconddiv = document.createElement('div')
    seconddiv.classList.add("buttonsgroup")
    div.appendChild(seconddiv)

    let button = document.createElement('button')
    button.innerHTML = ""
    button.value = value
    button.classList.add("markbutton")
    button.addEventListener("click", deletetask);
    button.addEventListener("click",deletetask)
    let secondbutton = document.createElement('button')
    secondbutton.innerHTML = ""
    secondbutton.classList.add("editbutton")
    secondbutton.classList.add("editsvg")
    
    seconddiv.appendChild(button)
    seconddiv.appendChild(secondbutton)
    
}
