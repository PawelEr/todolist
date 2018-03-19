var body = document.getElementById("body");
var content = document.getElementById("content");
var add = document.getElementById("add");
var tools = document.getElementById("tools");
var table = document.getElementById("table");


class Zadanie {

    constructor(name, category, priority) {
        this.name = name;
        this.category = category;
        this.priority = priority;
  };
}

class SerwisZadan{
    constructor(){
        this.list = this.wczytajZLocalStorage();
    };
    zapiszDoLocalStorage(){
        var myJSON = JSON.stringify(this.list);
        localStorage.setItem("myElement", myJSON);
    };
    dodaj(zadanie){
        this.list.push(zadanie);
        this.zapiszDoLocalStorage();
    }
    wczytajZLocalStorage(){
        var retrievedObject = localStorage.getItem("myElement");
        var retrievedList = JSON.parse(retrievedObject);
        if(retrievedList == null)
            return [];
        else
            return retrievedList;
    };
    usun(target){
        console.log(target);
        var index = this.list.indexOf(target);
        if(index<0)
            return;    
        this.list.splice(index, 1);
        this.zapiszDoLocalStorage(); 
    }
    edit(zadanie, i){
        this.list[i].name = zadanie.name;
        this.list[i].category = zadanie.category;
        this.list[i].priority = zadanie.priority;
        this.zapiszDoLocalStorage(); 
    }
}   

class Rubryka{
    constructor(){
    };
    refresh(list){
        table.innerHTML = "";
        for(let i=0; i<list.length; i++){
            var row = document.createElement("tr");
            row.id = "row" + (i+1);
            table.appendChild(row);
            var title = document.createElement("td");
            row.appendChild(title);
            title.innerHTML = list[i].name;
            var category = document.createElement("td");
            row.appendChild(category);
            category.innerHTML = list[i].category;
            var priority = document.createElement("td");
            row.appendChild(priority);
            priority.innerHTML = list[i].priority;
            var buttons = document.createElement("td");
            row.appendChild(buttons);
            var deleteButton = document.createElement("button");
            buttons.appendChild(deleteButton);
            deleteButton.id="deleteButton"
            deleteButton.innerHTML = "Delete";
            var editButton = document.createElement("button");
            buttons.appendChild(editButton);
            editButton.id="editButton";
            editButton.innerHTML = "Edit";
            
            deleteButton.addEventListener("click", () => {
                serwis.usun(list[i]);
                console.log(list, i);
                this.refresh(list);
                console.log(this);
            });
            editButton.addEventListener("click", () => {
                this.edit(list[i], i);                
            });
        }
    };
        edit(parametr, i){
            document.getElementById("title").value = parametr.name;
            document.getElementById("category").value = parametr.category;
            document.getElementById("priority").value = parametr.priority;
            add.parentNode.removeChild(add);
            var change = document.createElement("button");
            change.innerHTML = "Edit"
            tools.appendChild(change);
            change.addEventListener("click", function(){    
                var title = document.getElementById("title").value;
                var category = document.getElementById("category").value;
                var priority = document.getElementById("priority").value;    
                var zadanie = new Zadanie(title, category, priority);
                serwis.edit(zadanie, i);
                rubryka.refresh(serwis.list);
                document.getElementById("title").value = "";
                document.getElementById("category").value = "";
                document.getElementById("priority").value = "";
                change.parentNode.removeChild(change);
                tools.appendChild(add);
            });
        }
        
        
}

var serwis = new SerwisZadan();
var rubryka = new Rubryka();
rubryka.refresh(serwis.list);

add.addEventListener("click", function(){
    var title = document.getElementById("title").value;
    var category = document.getElementById("category").value;
    var priority = document.getElementById("priority").value;    
    var zadanie = new Zadanie(title, category, priority);
    serwis.dodaj(zadanie);
    rubryka.refresh(serwis.list);
    document.getElementById("title").value = "";
    document.getElementById("category").value = "";
    document.getElementById("priority").value = "";
});




