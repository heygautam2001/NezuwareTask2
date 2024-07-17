// script.js
document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('new-todo');
    todoInput.focus()
    const addButton = document.getElementById('add-button');
    const todoList = document.getElementById('todo-list');

    // Load todos from localStorage

    todoInput.onkeydown = e=>{
        if(e.key=="Enter"){
            addButton.click();
        }
    }

    loadTodos();

    addButton.addEventListener('click', addTodo);
    todoList.addEventListener('click', deleteTodo);

    function addTodo() {
        const todoText = todoInput.value.trim();
        if (todoText) {
            const li = document.createElement('li');
            li.innerHTML = `${todoText} <button><i class="fa-solid fa-trash"></i></button>`;
            todoList.appendChild(li);
            storeTodo();
            todoInput.value = '';
        }
    }

    function deleteTodo(event) {
        if (event.target.tagName === 'BUTTON') {
            event.target.parentElement.remove();
            storeTodo();
        }
    }

    function storeTodo() {
        const todos = [];
        todoList.querySelectorAll('li').forEach(li => {
            todos.push(li.textContent.replace('Delete', '').trim());
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function loadTodos() {
        const storedTodos = JSON.parse(localStorage.getItem('todos'));
        if (storedTodos) {
            storedTodos.forEach(todoText => {
                const li = document.createElement('li');
                li.innerHTML = `${todoText} <button><i class="fa-solid fa-trash"></i></button>`;
                todoList.appendChild(li);
            });
        }
    }
});
