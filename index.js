const form = document.getElementById("form");
const input = document.getElementById("input");
const todos = document.getElementById("todos");

let todoEl = JSON.parse(localStorage.getItem("todolis"));
if(todoEl){
    todoEl.forEach(todo=>{
        addTodo(todo);
    })
}


form.addEventListener("submit", (e) => {
    e.preventDefault();
    addTodo(e.target.value);
})

function addTodo(todo){
    let todotext = input.value;

    if(todo){
        todotext = todo.text;
    }

    if(todotext){
        let todoEl = document.createElement("li");
        todoEl.innerText = todotext;

        if(todo && todo.completed)
            todoEl.classList.add("completed");

        todos.appendChild(todoEl);
        updateLS();
        input.value = "";
        todoEl.addEventListener("click", function(){
            todoEl.classList.toggle("completed");
            updateLS();
        })

        todoEl.addEventListener('contextmenu', function(ev){
            ev.preventDefault();
            todoEl.remove();
            updateLS();
        })
    }
}

function updateLS(){
    let todosEl = document.querySelectorAll("li");
    const todolis = [];
    todosEl.forEach((todoEl) => {
        todolis.push({
            text : todoEl.innerText,
            completed : todoEl.classList.contains("completed"),
        });
    });
    
    
    localStorage.setItem("todolis", JSON.stringify(todolis));

}


