let todoInput = document.querySelector(".input"); 
let addTodoButton = document.querySelector(".button"); 
let todo; 
let todolist = []; 

// Creating function to get unique id

addTodoButton.addEventListener("click", (e) =>{
    e.preventDefault();
    todo = todoInput.value; 
    console.log(todo); 
})