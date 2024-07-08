document.addEventListener("DOMContentLoaded", function() {
    const inputField = document.querySelector("#modal-task-input");
    const addButton = document.querySelector("#add-task-btn");
    const todoList = document.querySelector("#todo-list");
    const pendingNum = document.querySelector("#pending-num");
    const clearButton = document.querySelector("#clear-btn");
    const allTasksButton = document.querySelector("#all-tasks");
    const activeTasksButton = document.querySelector("#active-tasks");
    const completedTasksButton = document.querySelector("#completed-tasks");
    const openModalBtn = document.querySelector("#open-modal-btn");
    const modal = document.querySelector("#task-modal");
    const closeModalBtn = document.querySelector(".close-btn");
    const prioritySelect = document.querySelector("#priority");
    const deadlineInput = document.querySelector("#deadline");
    const lightThemeBtn = document.querySelector("#light-theme");
    const darkThemeBtn = document.querySelector("#dark-theme");
    const progressBar = document.querySelector("#progress");
    const searchInput = document.querySelector("#search-input");
  
    openModalBtn.addEventListener("click", openModal);
    closeModalBtn.addEventListener("click", closeModal);
    window.addEventListener("click", outsideClick);
    addButton.addEventListener("click", addTask);
    inputField.addEventListener("keypress", function(e) {
      if (e.key === "Enter") {
        addTask();
      }
    });
  
    lightThemeBtn.addEventListener("click", function() {
      document.body.classList.remove("dark");
    });
  
    darkThemeBtn.addEventListener("click", function() {
      document.body.classList.add("dark");
    });
  
    function openModal() {
      modal.style.display = "block";
    }
  
    function closeModal() {
      modal.style.display = "none";
    }
  
    function outsideClick(e) {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    }
  
    function addTask() {
      let inputValue = inputField.value.trim();
      let priority = prioritySelect.value;
      let deadline = deadlineInput.value;
  
      if (inputValue !== "") {
        let li = document.createElement("li");
        li.classList.add("todo-item");
        li.classList.add(`${priority}-priority`);
  
        li.innerHTML = `
          <span class="task">${inputValue} ${deadline ? `(Due: ${deadline})` : ''}</span>
          <div class="action-buttons">
            <button class="complete-btn tooltip" aria-label="Mark as completed">
              <i class="uil uil-check-circle"></i>
              <span class="tooltiptext">Mark as completed</span>
            </button>
            <button class="delete-btn tooltip" aria-label="Delete task">
              <i class="uil uil-trash"></i>
              <span class="tooltiptext">Delete task</span>
            </button>
          </div>
        `;
  
        todoList.appendChild(li);
        inputField.value = "";
        prioritySelect.value = "low";
        deadlineInput.value = "";
        closeModal();
        updateTasks();
      }
    }
  
    function updateTasks() {
      let tasks = document.querySelectorAll(".todo-item");
      let completedTasks = document.querySelectorAll(".todo-item.completed");
      pendingNum.textContent = tasks.length === 0 ? "no" : tasks.length;
      let progress = tasks.length === 0 ? 0 : completedTasks.length / tasks.length * 100;
      progressBar.style.width = progress + "%";
    }
  
    todoList.addEventListener("click", function(e) {
      if (e.target.closest(".complete-btn")) {
        e.target.closest(".todo-item").classList.toggle("completed");
        updateTasks();
      } else if (e.target.closest(".delete-btn")) {
        e.target.closest(".todo-item").remove();
        updateTasks();
      }
    });
  
    clearButton.addEventListener("click", function() {
      todoList.innerHTML = "";
      updateTasks();
    });
  
    allTasksButton.addEventListener("click", function() {
      showTasks("all");
      setActiveFilterButton(this);
    });
  
    activeTasksButton.addEventListener("click", function() {
      showTasks("active");
      setActiveFilterButton(this);
    });
  
    completedTasksButton.addEventListener("click", function() {
      showTasks("completed");
      setActiveFilterButton(this);
    });
  
    function showTasks(taskType) {
      let tasks = document.querySelectorAll(".todo-item");
  
      tasks.forEach(task => {
        switch (taskType) {
          case "all":
            task.style.display = "flex";
            break;
          case "active":
            task.classList.contains("completed") ? task.style.display = "none" : task.style.display = "flex";
            break;
          case "completed":
            task.classList.contains("completed") ? task.style.display = "flex" : task.style.display = "none";
            break;
          default:
            break;
        }
      });
    }
  
    function setActiveFilterButton(button) {
      document.querySelectorAll(".filters button").forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
    }
  
    searchInput.addEventListener("input", function() {
      let filter = searchInput.value.toLowerCase();
      let tasks = document.querySelectorAll(".todo-item");
  
      tasks.forEach(task => {
        let text = task.querySelector(".task").textContent;
        if (text.toLowerCase().includes(filter)) {
          task.style.display = "flex";
        } else {
          task.style.display = "none";
        }
      });
    });
  
    // Enable drag-and-drop functionality using SortableJS
    new Sortable(todoList, {
      animation: 150,
      ghostClass: 'sortable-ghost'
    });
  });
  