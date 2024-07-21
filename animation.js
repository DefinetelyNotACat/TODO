let buttons = document.querySelectorAll('.markbutton')
let editbuttons = document.querySelectorAll('.editbutton')
let names = document.querySelectorAll('.name')
let rows = document.querySelectorAll('.rowdata')
let buttonssize = buttons.length-1
let containerrow = document.querySelector('.containerrows')
let maxvalue = buttons[buttonssize]
let checkiffirst = false
let audiobutton = document.getElementById("audio")
let audioon = document.getElementById('audioon')
let audiooff = document.getElementById('audiooff')
let touches = 0
let colorrow = false
let precedentselected
let mousePointer
let sounds = true
let removebuttons = document.querySelectorAll('.removebutton')





buttons.forEach(button => {
    button.addEventListener("click",deletetask)
});
editbuttons.forEach(button => {
    button.addEventListener("click",edittask)
});

removebuttons.forEach(button => {
    //console.log(button)
    button.addEventListener("click",removetask)

});
names.forEach(name => {
    
    name.addEventListener("keyup", function(event) {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter") {
          // Cancel the default action, if needed
          event.preventDefault();
          // Trigger the button element with a click
          addTask()
        }
        else if(event.key === "ArrowUp"){
            let attribute = name.getAttribute("number")
            let command = "up"
            move(command,attribute)
        }
        else if(event.key === "ArrowDown"){
            let attribute = name.getAttribute("number")
            console.log("down")
            let command = "down"
            move(command,attribute)
        }
        else if(event.key === "Shift"){
            let attribute = name.getAttribute("number")
            let command = "Shift"
            console.log(command)
            deletetask(attribute)
        }
        else{
            let numberofinput = name.getAttribute("number")
            let content = name.value
            updateDB(numberofinput,content)
           

        }
      });
});

window.onload = function checkphone()
{
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        //console.log(navigator)
        //console.log("mobile")
        alert("cellphone version not avaiable yet")
    }
    //else console.log(navigator.userAgent)
}


function deletetask(nicevalue)
{
    let buttons = document.querySelectorAll('.markbutton')
    let editbuttons = document.querySelectorAll('.editbutton')
    let names = document.querySelectorAll('.name')
    let removebuttons = document.querySelectorAll('.removebutton')
    let value 
    if(nicevalue){
        value = nicevalue-1
    }
    else value = this.value-1
    
    for(let i = 0; i < buttons.length; i++){
        buttons[i].value = i+1
        editbuttons[i].value = i+1
        removebuttons[i].value = i+1
        names[i].setAttribute('number',i+1)

    }
   
    if(value==names.length) value-=1
    if(names[value].classList.contains("done"))
    {
        names[value].classList.remove("done")
        buttons[value].classList.remove("buttondone")
        removedone(value)
    }

    else
    { 
        names[value].classList.add("done")
        buttons[value].classList.add("buttondone")
        setdone(value)
    }

    if(buttons[value].classList.contains("buttondone")){
        if(sounds)
        {
            let audio = new Audio('sounds/deleted.wav')
            audio.play()
        }
    }
}

function edittask()
{
    let names = document.querySelectorAll(".name")
    let buttons = document.querySelectorAll(".markbutton")
    let rows = document.querySelectorAll('.rowdata')

    //console.log("tony tony tooonyyyyyy")

    if(this.value)
    {
        let value = this.value-1
           

            if(colorrow == false)
            {
                colorrow = true
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
                    colorrow = false
                    hidecursor(value)
                })
            }
            else
            {
                let num = -1
                rows.forEach(row => {
                    num++
                    if(row.classList.contains("icanedit")){
                       
                        names[num].focus()
                        
                    }
                });
            }
 
   
       
       
      
    }
}

function hidecursor(value)
{
    let rows = document.querySelectorAll('.rowdata')
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
        if(sounds)
        {
            let audio = new Audio('sounds/eraseall.wav')
            audio.play()
        }
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
    let buttons = document.querySelectorAll('.markbutton')
    let names = document.querySelectorAll('.name')
    if(buttons.length!==0)
    {
   
        let maxvalue = names.length
        addRow(maxvalue)
        addDB(maxvalue)
    }
    else
    {
        maxvalue = 1
        addRow(maxvalue)
        createDB(maxvalue)

    }

       

}


function addRow(value)
{
    let buttons = document.querySelectorAll('.markbutton')
    if(buttons.length==0){

        value = 1
    }   
    else value = parseInt(value) + 1

    let div = document.createElement('div')
    div.classList.add("rowdata")
    let input = document.createElement('input')
    input.setAttribute("type", "text")
    input.setAttribute('number',value)
    input.classList.add("name")
    input.addEventListener("keyup", function(event) {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter") {
          // Cancel the default action, if needed
          event.preventDefault();
          // Trigger the button element with a click
          addTask()
        }
        else if(event.key === "ArrowUp"){
            let command = "up"
            move(command,value)
        }
        else if(event.key === "ArrowDown"){
            let command = "down"
            move(command,value)
        }
        else if(event.key === "Shift"){
            let attribute = input.getAttribute("number")
            let command = "Shift"


            deletetask(attribute)
        }
        else{
         
                let numberofinput = input.getAttribute("number")
                let content = input.value
                updateDB(numberofinput,content)
              
          
        }
      });
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
    let secondbutton = document.createElement('button')
    secondbutton.innerHTML = ""
    secondbutton.classList.add("editbutton")
    secondbutton.classList.add("editsvg")
    secondbutton.addEventListener("click", edittask);
    secondbutton.value = value
    seconddiv.appendChild(button)
    seconddiv.appendChild(secondbutton)
    input.focus()


    let thirdbutton = document.createElement('button')
    thirdbutton.innerHTML = ""
    thirdbutton.value = value
    thirdbutton.classList.add("removebutton")
    thirdbutton.addEventListener("click", removetask);  
    seconddiv.appendChild(thirdbutton)

    let size = buttons.length

    //try

    let names = document.querySelectorAll('.name')
    let nicebuttons =  document.querySelectorAll('.markbutton')
    let niceeditbuttons = document.querySelectorAll('.editbutton')
    let removebuttons = document.querySelectorAll('.removebutton')

    for(let i = 0; i < names.length; i++)
    {
        nicebuttons[i].value = i+1
        niceeditbuttons[i].value = i+1
        removebuttons[i].value = i+1
        names[i].setAttribute('number',i+1)
        
    }


}


function changeaudio()
{
    if(touches%2==0) 
    touches+=1

    if(touches % 2 == 0)
        {
        audioon.classList.remove("hidden")
        audiooff.classList.add("hidden")
        sounds = true
    }
    else{
        audiooff.classList.remove("hidden")
        audioon.classList.add("hidden")
        sounds = false
    }
 

}


function removetask()
{
    let names = document.querySelectorAll(".name")

    let rows = document.querySelectorAll('.rowdata')
    let value = this.value-1
    /*
        if(value == rows.length) rows[value-1].remove();
        //!FIX ERROR HERE 
        else rows[value].remove()
    */

    if(value == rows.length) rows[value-1].remove();
    else rows[value].remove()

    let buttons = document.querySelectorAll(".markbutton")
    let editbuttons = document.querySelectorAll('.editbutton')
    let removebuttons = document.querySelectorAll('.removebutton')
    for(let i = 0; i < buttons.length; i++)
        {
            let numba = i+1
            buttons[i].value = numba
            editbuttons[i].value = numba
            removebuttons[i].value = numba
            names[i].setAttribute('number',numba)
            
        }
    reorderlist()
    deletefromDB(value)
}



function addDB(value)
{
    value+=1
   
    let names = document.querySelectorAll(".name")
    let element = names[value]

    let str = "addelement"
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function() 
    {
        //console.log(this.responseText)
        //updateDB(element,value)
    }
    xmlhttp.open("POST", "elaborator.php");
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("request="+str+"&value="+value);       
}


function createDB(value)
{
    let str = "createtable"
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function() 
    {
        //onsole.log(this.responseText)
    }
    xmlhttp.open("POST", "elaborator.php");
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("request="+str);  
}

function updateDB(value,content)
{
    let str = "edittable"
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function() 
    {
        //console.log(this.responseText)
    }
    xmlhttp.open("POST", "elaborator.php");
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("request="+str+"&value="+value+"&content="+content);  
}


function deletefromDB(value)
{
    value+=1
    let str = "deletefromtable"
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function() 
    {
        //console.log(this.responseText)
        rearrangeDB(value)
    }
    xmlhttp.open("POST", "elaborator.php");
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("request="+str+"&value="+value);  
}


function move(command,value)
{
    let names = document.querySelectorAll('.name')
    let realvalue = value-1
    let nameslength = names.length
    //you can move upwards only if you arent at the first object
    if(command == "up" && value !=1){
        let selected = names[realvalue-1]
        selected.focus()
    }
    else if(command == "down" && value != nameslength){
        let selected = names[realvalue+1]
        selected.focus()
    }
}

function reorderlist()
{
    let names = document.querySelectorAll('.name')
    let nicebuttons =  document.querySelectorAll('.markbutton')
    let niceeditbuttons = document.querySelectorAll('.editbutton')
    let removebuttons = document.querySelectorAll('.removebutton')
    for(let i = 0; i < names.length; i++)
    {

        nicebuttons[i].value = i+1
        niceeditbuttons[i].value = i+1
        removebuttons[i].value = i+1
        names[i].setAttribute('number',i+1)
    }
}

function rearrangeDB(value)
{
    //console.log("ho attivato rearrangeDB")
    let valuey = value-1
    //console.log("il mio valore interno vale ",valuey)
    let str = "rearrangeDB"
    let names = document.querySelectorAll('.name')

    for(let i = valuey+1; i > 0 ; i--)
        {

            const xmlhttp = new XMLHttpRequest();
            xmlhttp.onload = function() 
            {
                //console.log(this.responseText)
            }
            xmlhttp.open("POST", "rearranger.php");
            xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xmlhttp.send("value="+i);  
        }
}


function setdone(value)
{
    value+=1
    let str = "markdone"
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function() 
    {
        //console.log(this.responseText)
    }
    xmlhttp.open("POST", "elaborator.php");
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("request="+str+"&value="+value); 
}

function removedone(value)
{
    value+=1
    let str = "removedone"
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function() 
    {
        //console.log(this.responseText)
    }
    xmlhttp.open("POST", "elaborator.php");
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("request="+str+"&value="+value); 
}