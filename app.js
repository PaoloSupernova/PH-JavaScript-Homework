document.addEventListener("DOMContentLoaded", function() {
    const todoForm = document.getElementById("todoForm");
    const todoInput = document.getElementById("todoInput");
    const todoList = document.getElementById("todoList");
    let todos = [];

    todoForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const todoText = todoInput.value.trim();

        if (!todoText || todoText.length > 255 || todos.includes(todoText)) {
            alert("Please enter a valid todo (not blank, under 255 characters, not duplicate).");
            return;
        }

        todos.push(todoText);
        todoInput.value = '';
        renderTodos();
    });

    function renderTodos() {
        todoList.innerHTML = '';
        todos.forEach(function(todo, index) {
            const todoItem = document.createElement("li");
            todoItem.className = "bg-white p-2 shadow-sm mb-2 flex justify-between items-center";
            todoItem.innerHTML = `
                <span>${todo}</span>
                <button onclick="deleteTodo(${index})" class="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded">
                    Delete
                </button>
            `;
            todoList.appendChild(todoItem);
        });
    }

    window.deleteTodo = function(index) {
        todos.splice(index, 1);
        renderTodos();
    }

    document.getElementById("finalizeButton").addEventListener("click", function() {
        localStorage.setItem("todos", JSON.stringify(todos));
        window.location.href = 'todolist.html';
    });
});

