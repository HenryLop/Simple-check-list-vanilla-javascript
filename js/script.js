window.onload = function(){
    if(window.localStorage){
        let myCheckList = document.getElementById("myCheckList");  
        let saved = window.localStorage["myCheckList"];    
        if(saved){
            myCheckList.innerHTML = saved;
        }
    }
    
}
window.onbeforeunload = function(){
    if(window.localStorage){
        let myCheckList = document.getElementById("myCheckList");
        window.localStorage.setItem("myCheckList",myCheckList.innerHTML);
    }
}

function add(){
    let userInput = document.getElementsByName("note").item(0);
    let list = document.getElementById(document.querySelector("#categorias select").value);
    if(userInput.value && userInput.value.length < 10){ //Check if is not empty 
        list.innerHTML += "<li class=\"active\">\
                                <input type=\"text\" value= \""+(userInput.value)+"\" onfocusout=\"finishEdit(this)\" disabled>\
                                <div id=\"options\">\
                                    <div class=\"boton\" onclick=\"complete(this.parentElement.parentElement)\">&#10004</div>\
                                    <div class=\"boton\" onclick=\"remove(this.parentElement.parentElement)\">X</div>\
                                    <div class=\"boton\" onclick=\"edit(this)\">edit</div>\
                                </div>\
                            </li>";
        
        userInput.value = "";        
    }    
}

function complete(listElement){
    let note = listElement.firstElementChild;
    
    note.style.textDecoration = "line-through";
    listElement.style.listStyle = "disc";
    listElement.style.listStylePosition = "inside";
    listElement.style.opacity = "0.3";
    listElement.className = "deactivated";
    
    
    let options = listElement.lastElementChild;
    
    options.removeChild(options.firstElementChild);
    options.removeChild(options.lastElementChild);

}

function remove(listElement){
    listElement.parentElement.removeChild(listElement);
}

function edit(editButton){
    let note = editButton.parentElement.parentElement.firstElementChild; 
    note.removeAttribute("disabled");
    note.focus();    
}
function finishEdit(note){    
    note.setAttribute("disabled","");
}
function addCategory(){
    let text = prompt("Ingrese la categoria","");
    
    if(text && text.length < 10){
        let  select = document.querySelector("#categorias select");
        let option = document.createElement("option");    
        
        option.text = text;
        select.add(option);
        option.selected = true;
        
        let categories = document.getElementById("categories");
        categories.innerHTML+= " <ul>\
                                    <div class= \"boton\" id=\"close_button\" onclick=\"deleteCategory(this.parentElement)\">X</div>\
                                    <fieldset id="+text+">\
                                    <legend >"+text+"</legend>\
                                    </fieldset>\
                                </ul> ";
    }
}
function deleteCategory(category){
    let id =     category.children[1].id;
    let  options = document.getElementsByTagName("option");
    let option;
    for(i = 0; i < options.length; i++){
        if(options.item(i).value == id){
            option = options.item(i);
            i = options.length+1;
        }
    }
    option.parentElement.removeChild(option);
    category.parentElement.removeChild(category);
}

