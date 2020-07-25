const todoForm = document.getElementById("todo-js");
const todoInput = document.getElementById("todo-input");
const todoUl = document.getElementById(`ul-js`);

const TODO_LIST = `To-do`;

let todoAry = []

function saveTodo(){
    localStorage.setItem(TODO_LIST,JSON.stringify(todoAry))
}

function askTodo(text){
    const delBtn = document.createElement(`button`);
    const clearBtn = document.createElement(`button`);
    const todoLi = document.createElement(`li`);
    const span = document.createElement(`span`);
    const newId = todoAry.length + 1;
    todoUl.prepend(todoLi);
    todoLi.prepend(span);
    span.innerText = text;
    todoLi.id = newId;
    //deletebutton
    todoLi.append(delBtn);
    delBtn.innerText = `X`;
    //clearbutton
    clearBtn.innerText = `O`;
    todoLi.append(clearBtn);
    delBtn.addEventListener("click",handleDelete);
    const todoObj = {
        user :text ,
        id : newId
    };
    todoAry.push(todoObj);
    saveTodo()
}


function submitTodo(e){
    e.preventDefault();
    const currentToDo = todoInput.value;
    askTodo(currentToDo);
    todoInput.value = "";
}

function handleDelete(){
    const btn = event.target;
    const li = btn.parentNode;
    todoUl.removeChild(li);
    const cleanTodo = todoAry.filter((todo)=>{
        return todo.id !== parseInt(li.id);
    })
    todoAry = cleanTodo;
    saveTodo();
}


function loadTodo(){
    const getTodo = localStorage.getItem(TODO_LIST)
    if(getTodo !== null){
        const parseToDos =  JSON.parse(getTodo);
        parseToDos.forEach((toDo) => {
            askTodo(toDo.user);
        })
    }
}


function handleTodo(){
    todoForm.addEventListener("submit",submitTodo);
    loadTodo()
}
handleTodo();