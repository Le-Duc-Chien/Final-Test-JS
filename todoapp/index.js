function listTodo(event) {
  event.preventDefault();
  var list = document.getElementById("list").value;
  var listCV = document.getElementById("dsvl");

  if (list.trim() !== "") {
    var listItem = document.createElement("li");
    listItem.textContent = list;

    listItem.addEventListener("click", function() {
      this.classList.toggle("completed");
      updateLocalStorage();
    });

    var deleteButton = document.createElement("button");
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
  var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: value, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadFromLocalStorage() {
  var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  var listCV = document.getElementById("dsvl");

  tasks.forEach(function(task) {
    var listItem = document.createElement("li");
    listItem.textContent = task.text;
    if (task.completed) {
      listItem.classList.add("completed");
    }

    listItem.addEventListener("click", function() {
      this.classList.toggle("completed");
      updateLocalStorage();
    });

    var deleteButton = document.createElement("button");
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
  var listItems = document.querySelectorAll("#dsvl li");
  var tasks = Array.prototype.slice.call(listItems).map(function(item) {
    return {
      text: item.childNodes[0].nodeValue.trim(),
      completed: item.classList.contains("completed"),
    };
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function filterTasks(filter) {
  var listItems = document.querySelectorAll("#dsvl li");
  Array.prototype.forEach.call(listItems, function(item) {
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

  var tabs = document.querySelectorAll(".tab");
  Array.prototype.forEach.call(tabs, function(tab) {
    tab.classList.remove("active");
  });
  document.querySelector('.tab[data-filter="' + filter + '"]').classList.add("active");
}

function clearCompletedTasks() {
  var listItems = document.querySelectorAll("#dsvl .completed");
  Array.prototype.forEach.call(listItems, function(item) {
    item.remove();
  });
  updateLocalStorage();
}

document.addEventListener("DOMContentLoaded", loadFromLocalStorage);
var tabs = document.querySelectorAll(".tab");
Array.prototype.forEach.call(tabs, function(tab) {
  tab.addEventListener("click", function() {
    filterTasks(this.getAttribute("data-filter"));
  });
});
document.querySelector(".clear-completed-button").addEventListener("click", clearCompletedTasks);
