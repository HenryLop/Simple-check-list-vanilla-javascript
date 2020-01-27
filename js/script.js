window.onload = function(){
    if(window.localStorage){
        let list = document.getElementById("list");  
        let saved = window.localStorage["list"];
        
        if(saved){
            list.innerHTML = saved;
        }
    }
    
}
window.onbeforeunload = function(){
    if(window.localStorage){
        let list = document.getElementById("list");
        window.localStorage.setItem("list",list.innerHTML);
    }
}

function add(){
    let userInput = document.getElementsByName("note").item(0);
    let list = document.getElementById("list");
    if(userInput.value){ //Check if is not empty 
        list.innerHTML += "<li class=\"active\">\
                                <input type=\"text\" value= \""+(userInput.value)+"\">\
                                <div id=\"options\">\
                                    <div id=\"complete\" onclick=\"complete(this.parentElement.parentElement)\">*</div>\
                                    <div id=\"delete\" onclick=\"remove(this.parentElement.parentElement)\">X</div>\
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
    
}

function remove(listElement){
    listElement.parentElement.removeChild(listElement);
}