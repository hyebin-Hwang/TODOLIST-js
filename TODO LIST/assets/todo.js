const todoForm = document.getElementById("todo-js");
const todoInput = document.getElementById("todo-input");
const todoLeft = document.getElementById(`ul-left`);
const todoRight = document.getElementById(`ul-right`);
const todoContainer = document.getElementById(`todoContainer`)

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
    todoLeft.prepend(todoLi);
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
    clearBtn.addEventListener("click",handleClear)
    const todoObj = {
        todo :text ,
        id : newId 
    };
    todoAry.push(todoObj);
    saveTodo()
}
// todo 값이 done 값으로 그 후 asktodo done 값이 존재하면 right section done 값출력
// if(todoAry.done){done 값이 right section 출력!}
function handleClear(){
    const li = event.target.parentNode;
    const ul = li.parentNode;
    let nextUl = ul.nextElementSibling;
    if(nextUl === null){
        let nextUl = ul.previousElementSibling;
        nextUl.prepend(li);
    }else{
        nextUl.prepend(li);
        //todoAry.todo 삭제 and t
    }
    console.log(event)
    //누른거 하나만 todoObj.todo 값이 삭제 todoObj.done 값으로 되기를 원함
    saveTodo();
}



function submitTodo(e){
    e.preventDefault();
    const currentToDo = todoInput.value;
    askTodo(currentToDo);
    todoInput.value = "";
}

function handleDelete(e){
    const li = event.target.parentNode;
    const ul = li.parentNode;
    ul.removeChild(li);
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
        parseToDos.forEach((toDo) => {//error done 하나라도 존재시 
            askTodo(toDo.todo);
        })
    }
}


function handleTodo(){
    todoForm.addEventListener("submit",submitTodo);
    loadTodo()
}
handleTodo();