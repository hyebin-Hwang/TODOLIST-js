const nameContainer = document.getElementById("name-js");
const nameInput = nameContainer.querySelector("input");

const USER = "user"

function saveUser(user){
    localStorage.setItem(USER,user);
}

function handleSubmit(e){
    e.preventDefault();
    const currentUser = nameInput.value;
    saveUser(currentUser);
    greetUser(currentUser);
} 
//인풋에 입력한 값이 div 에 추가되서 나오게
//input 은 디스플레이 none;

function greetUser(user){
    const h3 = document.createElement(`h3`);
    nameContainer.prepend(h3);
    nameInput.style.display = `none`;
    h3.classList.add(`name_h3`)
    h3.innerText = `Hello , ${user}` ;
}

function handleInput(){
    nameContainer.addEventListener("submit",handleSubmit)   
}

function loadUser(){
    const getUser = localStorage.getItem(USER);
    if(getUser === null){
        handleInput();
    }else{
        greetUser(getUser);
    }
}
loadUser();
