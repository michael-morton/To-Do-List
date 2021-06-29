const todoObjectList = [];
var i = 1;
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = yyyy + '-' + mm + '-' + dd

class Todo_Class {
  constructor(item) {
    this.ulElement = item;
  }

  add() {
   
    const input = document.querySelector("#myInput").value;
    const date = document.querySelector("#Date").value;
    var taskNumber = i;
    const todoInput = taskNumber + ") " + "Task: " + input + ", " + " Date: " + date;

    if (input == "") {
      alert("You did not enter an item!")
    } 
    else if (date == "")
    {
      alert("You did not enter a date!")
    }
    else if (date < today)
    {
      alert("You did not enter a valid date!")
    }  
    else {
    	i++;
      const todoObject = {
        id: todoObjectList.length,
        todoText: todoInput,
        isDone: false,
      }

      todoObjectList.push(todoObject);
      this.display();
      document.querySelector("#myInput").value = '';


    }
  }

  complete_notComplete(x) {
    const selectedTodoIndex = todoObjectList.findIndex((item) => item.id == x);
    console.log(todoObjectList[selectedTodoIndex].isDone);
    todoObjectList[selectedTodoIndex].isDone == false ? todoObjectList[selectedTodoIndex].isDone = true : todoObjectList[selectedTodoIndex].isDone = false;
    this.display();
  }

  deleteElement(z) {
    const selectedDelIndex = todoObjectList.findIndex((item) => item.id == z);

    todoObjectList.splice(selectedDelIndex, 1);

    this.display();
    i--;
  }


  display() {
    this.ulElement.innerHTML = "";

    todoObjectList.forEach((object_item) => {

      const liElement = document.createElement("li");
      const delBtn = document.createElement("i");

      liElement.innerText = object_item.todoText;
      liElement.setAttribute("data-id", object_item.id);

      delBtn.setAttribute("data-id", object_item.id);
      delBtn.classList.add("far", "fa-trash-alt");

      liElement.appendChild(delBtn);

      delBtn.addEventListener("click", function(e) {
        const deleteId = e.target.getAttribute("data-id");
        myTodoList.deleteElement(deleteId);
      })

      liElement.addEventListener("click", function(e) {
        const selectedId = e.target.getAttribute("data-id");
        myTodoList.complete_notComplete(selectedId);
      })

      if (object_item.isDone) {
        liElement.classList.add("checked");
      }

      this.ulElement.appendChild(liElement);
    })
  }
}




////-----MAIN PROGRAM------------
const listSection = document.querySelector("#myUL");

myTodoList = new Todo_Class(listSection);


document.querySelector(".addBtn").addEventListener("click", function() {
  myTodoList.add()
})

document.querySelector("#myInput, #Date").addEventListener("keydown", function(e) {
  if (e.keyCode == 13) {
    myTodoList.add()
  }
})
