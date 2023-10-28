// Creating function to get unique id
function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

let todoInput = document.querySelector(".input"); 
let addTodoButton = document.querySelector(".button"); 
let showTodos = document.querySelector(".todos-container"); 
let todo = "";

let localData = JSON.parse(localStorage.getItem("todos")); 
let todoList = localData || [];

//  Applying EventListener to button
addTodoButton.addEventListener("click", (e) =>{
    e.preventDefault();
    todo = todoInput.value; 
    if(todo.length > 0){
        /* pushing our todo task in the array with a unique id and mark initially as it undone or false */
        todoList.push({
            id:uuid(), 
            todo,  
            isCompleted:false
        });    
        renderTodoList(todoList); 
        localStorage.setItem("todos", JSON.stringify(todoList));
        todoInput.value = ""; 
    }
});
 
showTodos.addEventListener("click", (e) => {
    e.preventDefault();
    let key = e.target.dataset.key;
    let delTodoKey = e.target.dataset.todokey;
    todoList = todoList.map((todo) =>
        todo.id === key ? {
            ...todo,
            isCompleted: !todo.isCompleted
        } : todo
    );
    todoList = todoList.filter((todo) => todo.id !== delTodoKey);
    localStorage.setItem("todos", JSON.stringify(todoList));
    console.log(todoList);
    renderTodoList(todoList);
});
 

function renderTodoList(todoList){

    /*          Example of how to add HTML code Through JavaScript
    showTodos.innerHTML = `<div><input type="checkbox">  <label class="todo"> sky diving </label>  <button> delete </button></div>`;
    */
    
    // console.log(todoList); 
                                    // Way-1
    // showTodos.innerHTML = todoList.map(todo => `<div> <input id="ite-${todo.id}" type="checkbox">  <label for="item-${todo.id}" class="todo">${todo.todo}</label>  <button>delete</button>  </div>`)
                                    // Way-2 by Restructuring the Object
    showTodos.innerHTML = todoList.map( 
        ({
            id, 
            todo, 
            isCompleted
        }) => 
        `<div class="todo relative"> <input id="item-${id}" data-key=${id} class="t-checkbox t-pointer" type="checkbox" ${isCompleted ? "checked" : ""}>
            <label data-key=${id} class="todo-text t-pointer ${isCompleted ? "checked-todo" : ""}" for="item-${id}"> ${todo} </label> 
                <button class="absolute right-0 button cursor">
                    <span data-todokey=${id}  class="del-btn material-icons-outlined">
                        delete
                    </span>
                </button>
        </div>`
    );
}

renderTodoList(todoList); 


/*                   How to convert Normal Object into Restucture object      
const todo = {
    id:"123",
    todo:"Sky Diving",
    isCompleted:"false"
} 
         OR a restructure way
const {id, todo, isComplete} = todo; 
 */
