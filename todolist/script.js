document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("task");
    const taskList = document.getElementById("taskList");
    const addTaskButton = document.getElementById("addTask");
    const clearButton = document.getElementById("clearStorageButton");

    let tasks = loadTasksFromLocalStorage();

    addTaskButton.addEventListener("click", function() {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            addTask(taskText, "#777"); // Default background color is #777
            taskInput.value = "";
        }
    });

    taskInput.addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            addTaskButton.click();
        }
    });

    clearButton.addEventListener("click", function() {
        localStorage.removeItem("tasks");
        tasks = [];
        taskList.innerHTML = "";
    });

    function addTask(text, color) {
        const existingTask = tasks.find(task => task.text === text);
        let background = color || "#777"; // Use the provided color or default to #777

        if (existingTask) {
            background = existingTask.background; // Load the background color from local storage for existing tasks
        }

        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
            <span class="tick">✓</span>
            <span class="task">${text}</span>
            <span class="cross">✗</span>
            <span class="delete">🗑</span>
        `;

        const tickButton = taskItem.querySelector(".tick");
        const crossButton = taskItem.querySelector(".cross");
        const deleteButton = taskItem.querySelector(".delete");

        taskItem.style.backgroundColor = background;

        tickButton.addEventListener("click", function() {
            taskItem.style.backgroundColor = "limegreen";
            updateTaskCompletionStatus(text, true);
        });

        crossButton.addEventListener("click", function() {
            taskItem.style.backgroundColor = "red";
            updateTaskCompletionStatus(text, false);
        });

        deleteButton.addEventListener("click", function() {
            taskList.removeChild(taskItem);
            deleteTask(text);
        });

        if (!existingTask) {
            saveTaskToArray(text, background);
        }

        taskList.appendChild(taskItem);
    }

    function saveTaskToArray(text, background) {
        tasks.push({ text, background, completed: false });
        saveTasksToLocalStorage();
    }

    function deleteTask(text) {
        tasks = tasks.filter(task => task.text !== text);
        saveTasksToLocalStorage();
    }

    function saveTasksToLocalStorage() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasksFromLocalStorage() {
        const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        return storedTasks;
    }

    function loadTasks() {
        tasks.forEach(task => {
            addTask(task.text, task.background);
        });
    }

    loadTasks();
});
 