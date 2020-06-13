// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo")


// Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo)

// Functions

function addTodo(){
    // prevent form from submitting
    event.preventDefault();
    
    // Todo Div
    const todoDiv = document.createElement('div');
    // Adding class to the div 
    todoDiv.classList.add('todo');
    // Create Li
    const newTodo = document.createElement('li');
    // Adding class to the li
    newTodo.classList.add('todo-item')
    newTodo.innerText = todoInput.value;
    // appending newTodo to the container
    todoDiv.appendChild(newTodo);
    
    // Add todo to local storage
    saveLocalTodos(todoInput.value);

    // Check Mark button
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.classList.add('complete-btn');
    todoDiv.appendChild(completeButton);
    
    // Check Trash button
    const trash = document.createElement('button');
    trash.innerHTML = '<i class="fas fa-trash"></i>';
    trash.classList.add('trash-btn');
    todoDiv.appendChild(trash);

    // Appending the above thing to the list (UL)
    todoList.appendChild(todoDiv);

    // Clear todo Input
    todoInput.value = "";    
}

function deleteCheck(e){
    // console.log(e.target);
    const item = e.target;
    // DELETE
    if(item.classList[0] === "trash-btn"){
        // item.remove();
        
        const todo = item.parentElement;
        //Animation
        todo.classList.add('fall')
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', ()=>{
            todo.remove();
        });
    }

    // Completed
    if(item.classList[0] === "complete-btn"){
        // item.remove();
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}


// filter
function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;

            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                } else{
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display = "flex";
                } else{
                    todo.style.display = "none";
                }
                break;
        }
    });
}



// local storage

function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  
  function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo) {
      //Create todo div
      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo");
      //Create list
      const newTodo = document.createElement("li");
      newTodo.innerText = todo;
      newTodo.classList.add("todo-item");
      todoDiv.appendChild(newTodo);
      todoInput.value = "";
      //Create Completed Button
      const completedButton = document.createElement("button");
      completedButton.innerHTML = `<i class="fas fa-check"></i>`;
      completedButton.classList.add("complete-btn");
      todoDiv.appendChild(completedButton);
      //Create trash button
      const trash = document.createElement("button");
      trash.innerHTML = `<i class="fas fa-trash"></i>`;
      trash.classList.add("trash-btn");
      todoDiv.appendChild(trash);
      //attach final Todo
      todoList.appendChild(todoDiv);
    });
  }
  


//   date and time

let a;
let time;
let date;
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
setInterval(()=>{
    a = new Date();
    // time = a.getHours() + ":" + a.getMinutes() + ":" + a.getSeconds();
    time = a.toLocaleTimeString('en-US');
    date = a.toLocaleDateString(undefined, options);
    document.getElementById('cur-time').innerHTML = date + " (" + time + ")";
}, 1000);
