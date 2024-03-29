document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const clearAllBtn = document.getElementById('clearAllBtn');
    const clearCompletedBtn = document.getElementById('clearCompletedBtn');
    const filterSelect = document.getElementById('filterSelect');
    const searchInput = document.getElementById('searchInput');
    const taskList = document.getElementById('taskList');
    const datetimeElement = document.getElementById('datetime');

    addTaskBtn.addEventListener('click', addTask);
    clearAllBtn.addEventListener('click', clearAllTasks);
    clearCompletedBtn.addEventListener('click', clearCompletedTasks);
    filterSelect.addEventListener('change', filterTasks);
    searchInput.addEventListener('input', searchTasks);

    // Function to add task
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            const now = new Date(); // Get current date and time
            const taskItem = document.createElement('li');
            taskItem.innerHTML = `
                <div class="task-wrapper">
                    <div class="task-content">
                        <input type="checkbox" class="completedCheckbox">
                        <span>${taskText}</span>
                    </div>
                    <div class="task-meta">
                        <span class="taskTime">${formatTime(now)}</span> <!-- Display task time -->
                        <span class="taskDate">${formatDate(now)}</span> <!-- Display task date -->
                        <button class="deleteBtn button">Delete</button>
                    </div>
                </div>
            `;
            const taskTimeElement = taskItem.querySelector('.taskTime');
            taskTimeElement.textContent = formatTime(now); // Set task time text
            const taskDateElement = taskItem.querySelector('.taskDate');
            taskDateElement.textContent = formatDate(now); // Set task date text
            taskItem.querySelector('.deleteBtn').addEventListener('click', function () {
                taskItem.remove();
                filterTasks();
            });
            taskList.appendChild(taskItem); // Append task item to task list
            taskInput.value = '';
            filterTasks();
        }
    }

    // Function to format time in HH:MM format
    function formatTime(date) {
        const options = { hour: 'numeric', minute: 'numeric' };
        return date.toLocaleTimeString('en-US', options);
    }

    // Function to format date in MM/DD/YYYY format
    function formatDate(date) {
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    // Function to clear all tasks
    function clearAllTasks() {
        taskList.innerHTML = '';
        filterTasks();
    }

    // Function to clear completed tasks
    function clearCompletedTasks() {
        const completedTasks = taskList.querySelectorAll('.completedCheckbox:checked');
        completedTasks.forEach(task => {
            task.parentElement.parentElement.remove(); // Adjusted to remove the task-wrapper element
        });
        filterTasks();
    }

    // Function to filter tasks based on selection
    function filterTasks() {
        const filterValue = filterSelect.value;
        const tasks = taskList.querySelectorAll('.task-wrapper');
        tasks.forEach(task => {
            const isCompleted = task.querySelector('.completedCheckbox').checked;
            if ((filterValue === 'completed' && !isCompleted) || (filterValue === 'uncompleted' && isCompleted)) {
                task.style.display = 'none';
            } else {
                task.style.display = 'flex';
            }
        });
    }

    // Function to search tasks
    function searchTasks() {
        const searchText = searchInput.value.toLowerCase();
        const tasks = taskList.querySelectorAll('.task-wrapper');
        tasks.forEach(task => {
            const taskText = task.querySelector('span').textContent.toLowerCase();
            if (taskText.includes(searchText)) {
                task.style.display = 'flex';
            } else {
                task.style.display = 'none';
            }
        });
    }

    // Update time and date every second
    setInterval(updateTimeAndDate, 1000);

    // Function to update time and date
    function updateTimeAndDate() {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        datetimeElement.textContent = `${formatTime(now)} - ${formatDate(now)}`;
    }

    // Call updateDateTime initially
    updateTimeAndDate();
});
