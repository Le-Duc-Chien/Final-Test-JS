function listTodo(event) {
  event.preventDefault();
  const list = document.getElementById("list").value;
  const listCV = document.getElementById("dsvl");

  if (list.trim() !== "") {
    const listItem = document.createElement("li");
    listItem.textContent = list;

    listItem.addEventListener("click", function() {
      this.classList.toggle("completed");
      updateLocalStorage();
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "xóa";
    deleteButton.classList.add("delete-button");

    deleteButton.addEventListener("click", function() {
      listItem.remove();
      updateLocalStorage();
    });

    listItem.appendChild(deleteButton);
    listCV.appendChild(listItem);
    saveToLocalStorage(list);

    document.getElementById("list").value = "";
  }
}

function saveToLocalStorage(value) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: value, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadFromLocalStorage() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const listCV = document.getElementById("dsvl");

  tasks.forEach(task => {
    const listItem = document.createElement("li");
    listItem.textContent = task.text;
    if (task.completed) {
      listItem.classList.add("completed");
    }

    listItem.addEventListener("click", function() {
      this.classList.toggle("completed");
      updateLocalStorage();
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "xóa";
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", function() {
      listItem.remove();
      updateLocalStorage();
    });

    listItem.appendChild(deleteButton);
    listCV.appendChild(listItem);
  });
}

function updateLocalStorage() {
  const listItems = document.querySelectorAll("#dsvl li");
  const tasks = Array.from(listItems).map(item => ({
    text: item.childNodes[0].nodeValue.trim(),
    completed: item.classList.contains("completed"),
  }));
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function filterTasks(filter) {
  const listItems = document.querySelectorAll("#dsvl li");
  listItems.forEach(item => {
    switch (filter) {
      case "all":
        item.style.display = "block";
        break;
      case "active":
        item.style.display = item.classList.contains("completed") ? "none" : "block";
        break;
      case "completed":
        item.style.display = item.classList.contains("completed") ? "block" : "none";
        break;
    }
  });

  document.querySelectorAll(".tab").forEach(tab => tab.classList.remove("active"));
  document.querySelector(`.tab[data-filter="${filter}"]`).classList.add("active");
}

function clearCompletedTasks() {
  const listItems = document.querySelectorAll("#dsvl .completed");
  listItems.forEach(item => item.remove());
  updateLocalStorage();
}

document.addEventListener("DOMContentLoaded", loadFromLocalStorage);
document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", function() {
    filterTasks(this.getAttribute("data-filter"));
  });
});
document.querySelector(".clear-completed-button").addEventListener("click", clearCompletedTasks);
