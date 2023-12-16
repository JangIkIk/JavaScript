// 엄격모드
"use strict"

export const addTodo = (e) => {
    e.preventDefault()
    const todo = {
        title: $userInput.value,
        completed: false
    }
    fetch("http://localhost:3001/list",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(todo),
    })
    .then(getTodos)
}

export const getTodos = ()=>{
            fetch("http://localhost:3001/list")
            .then( res => res.json())
            .then( data => renderAllTodos(data))
            .catch( error => console.log(error))
        }