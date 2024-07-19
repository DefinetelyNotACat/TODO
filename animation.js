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
            let attribute = name.getAttribute('number')
            let command = "up"
            move(command,attribute)
        }
        else if(event.key === "ArrowDown"){
            console.log("down")
            let command = "down"
            move(command,attribute)
        }
        else{
            let numberofinput = name.getAttribute('number')
            let content = name.value
            updateDB(numberofinput,content)
            console.log(numberofinput)
            console.log(content)
        }
      });
});

window.onload = function checkphone()
{
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        //console.log(navigator)
        //console.log("mobile")
        alert("fuori dai coglioni")
    }
    else console.log(navigator.userAgent)
}


function deletetask()
{
    let buttons = document.querySelectorAll('.markbutton')
    let editbuttons = document.querySelectorAll('.editbutton')
    let names = document.querySelectorAll('.name')
    let removebuttons = document.querySelectorAll('.removebutton')

    let size = buttons.length
    console.log(buttons.length)
    for(let i = 0; i < buttons.length; i++){
        buttons[i].value = i+1
        editbuttons[i].value = i+1
        removebuttons[i].value = i+1
        names[i].setAttribute('number',i+1)
        console.log(buttons.length)

    }
    let value = this.value-1
    console.log(value)
    console.log(names.length)
    if(value==names.length) value-=1
    console.log(names[value])
   

        names[value].classList.toggle("done")
        buttons[value].classList.toggle("buttondone")
    
       
    


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

    console.log("tony tony tooonyyyyyy")

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
                        console.log("sbadum")
                        console.log(num)
                        console.log(names[num])
                        names[num].focus()
                        
                    }
                });
            }
 
   
       
       
      
    }
}

function hidecursor(value)
{
    let rows = document.querySelectorAll('.rowdata')
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
        console.log("Il max è ",maxvalue)
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
    if(buttons.length==0)
    {

        value = 1
    }   
    else value = parseInt(value) + 1
    console.log("m piac sto value " + value)

    let div = document.createElement('div')
    div.classList.add("rowdata")
    console.log(containerrow)
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
            console.log("down")
            let command = "down"
            move(command,value)
        }
        else{
         
                let numberofinput = input.getAttribute('number')
                let content = input.value
                updateDB(numberofinput,content)
                console.log(numberofinput)
                console.log(content)
          
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
        console.log("GRANDE QUANTO ",names.length)
        nicebuttons[i].value = i+1
        niceeditbuttons[i].value = i+1
        removebuttons[i].value = i+1
        names[i].setAttribute('number',i+1)

    }


}


function changeaudio()
{
    if(touches%2==0) console.log(touches)
    touches+=1

    if(touches % 2 == 0)
        {
        audioon.classList.remove("hidden")
        audiooff.classList.add("hidden")
        sounds = true
        console.log("cummy")
    }
    else{
        audiooff.classList.remove("hidden")
        audioon.classList.add("hidden")
        sounds = false
    }
 

}


function removetask()
{
    let buttons = document.querySelectorAll(".markbutton")
    let editbuttons = document.querySelectorAll('.editbutton')
    let removebuttons = document.querySelectorAll('.removebutton')
    let rows = document.querySelectorAll('.rowdata')
    console.log(rows.length + " grandezza righe")
    let value = this.value-1
    /*
        if(value == rows.length) rows[value-1].remove();
        //!FIX ERROR HERE 
        else rows[value].remove()
    */
   console.log(value)
   console.log(rows[value])


    let names = document.querySelectorAll(".name")
    console.log(value, "HO RIMOSSO")
    console.log(names[value])

    for(let i = 0; i < names.length; i++)
    {
        let number = i
        buttons[i].value = i+1
        editbuttons[i].value = i+1
        removebuttons[i].value = i+1
        names[i].setAttribute('number',i+1)
        orderDB(number,names[i].value)
        console.log(names[i])
    }
    rows[value].remove()

    deletefromDB(value)
}



function addDB(value)
{
    value+=1
    console.log("quanto vali stronzo ")
    console.log("ROSAAAAA",value)
    let names = document.querySelectorAll(".name")
    let element = names[value]
    console.log(element, "adddb")

    let str = "addelement"
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function() 
    {
        console.log(this.responseText)
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
        console.log(this.responseText)
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
        console.log(this.responseText)
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
        console.log(this.responseText)
    }
    xmlhttp.open("POST", "elaborator.php");
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("request="+str+"&value="+value);  
}


function orderDB(value,content)
{
    value+=1
    let str = "ordertable"
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function() 
    {
        console.log(this.responseText)
    }
    xmlhttp.open("POST", "elaborator.php");
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("request="+str+"&value="+value+"&content="+content);  
}

function move(command,value)
{
    let names = document.querySelectorAll('.name')
    let realvalue = value-1
    let nameslength = names.length
    //you can move upwards only if you arent at the first object
    if(command == "up" && value !=1){
        let selected = names[realvalue]
        console.log("il vero valore è ", realvalue)
        console.log("vali ", realvalue)
        console.log(selected)
        selected.focus()
    }
}

