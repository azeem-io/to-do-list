const createButton = document.getElementById("submitButton");
const taskListContainer = document.getElementById("taskListContainer");
const taskInput = document.getElementById("task-input");

const taskList = [];

const createTask = () => {
  const taskName = taskInput.value;
  if (taskName === "") return;
  taskList.unshift({ task: taskName, deleted: false, done: false });
  taskInput.value = "";
  updateList();
  console.log(taskList);
};

createButton.addEventListener("click", createTask);
taskInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    createTask();
  }
});

const updateList = () => {
  taskListContainer.innerHTML = taskList
    .map((newTask) => {
      const className = newTask.done === false ? "task" : "task-done";
      const tickSymbol = newTask.done === false ? "" : "&#10004";
      return `
      <div class=${className}>
        <div class="tick">
          <div class="box">${tickSymbol}</div>
        </div>
        <div class='task-name'> ${newTask.task} </div>
        <div class='cross'>&#10060</div>
      </div>`;
    })
    .join("");
  const taskElementCrosses = document.getElementsByClassName("cross");
  for (let i = 0; i < taskElementCrosses.length; i++) {
    const elementCross = taskElementCrosses[i];
    elementCross.addEventListener("click", () => deleteTask(i));
  }
  const taskElementTick = document.getElementsByClassName("tick");
  for (let i = 0; i < taskElementTick.length; i++) {
    const elementTick = taskElementTick[i];
    elementTick.addEventListener("click", () => completeTask(i));
  }
};

const deleteTask = (i) => {
  taskList.splice(i, 1);
  updateList();
};

const completeTask = (i) => {
  taskList[i].done = true;
  updateList();
};
