const startCol = document.getElementById("startCol");
const inProgressCol = document.getElementById("inProgressCol");
const inReviewCol = document.getElementById("inReviewCol");
const completeBtn = document.getElementById("completeBtn");
const completeCol = document.getElementById("completeCol");

const saveBtn = document.getElementById("saveBtn");
const resetBtn = document.getElementById("resetBtn");
const deleteBtn = document.getElementById("deleteBtn");
const addTaskBtn = document.getElementById("addCardForm");
const doneBtn = document.getElementById("doneBtn");

const taskName = document.getElementById("taskName");
const description = document.getElementById("description");
const dueDate = document.getElementById("dueDate");
const assignedPPL = document.getElementById("assignedPPL");
const statusLabel = document.getElementById("statusLabel");
const status = document.getElementById("status");

class TaskManager {
  constructor(name, description, dueDate, assignedTo, status) {
    this._name = name;
    this._description = description;
    this._dueDate = dueDate;
    this._assignedTo = assignedTo;
    this._status = status;
    this._id = 0;
  }

  get name() {
    return this._name;
  }
  get description() {
    return this._description;
  }
  get dueDate() {
    return this._dueDate;
  }
  get assignedTo() {
    return this._assignedTo;
  }
  get status() {
    return this._status;
  }
  get id() {
    return this._id;
  }

  set name(newName) {
    this._name = newName;
  }
  set description(newDescription) {
    this._description = newDescription;
  }
  set dueDate(newDueDate) {
    this._dueDate = newDueDate;
  }
  set assignedTo(newAssignedTo) {
    this._assignedTo = newAssignedTo;
  }
  set status(newStatus) {
    this._status = newStatus;
  }
  set id(newId) {
    this._id = newId;
  }
}

const startArr = JSON.parse(localStorage.getItem("startArr"))
  ? JSON.parse(localStorage.getItem("startArr"))
  : [];
const inProgressArr = JSON.parse(localStorage.getItem("inProgressArr"))
  ? JSON.parse(localStorage.getItem("inProgressArr"))
  : [];
const inReviewArr = JSON.parse(localStorage.getItem("inReviewArr"))
  ? JSON.parse(localStorage.getItem("inReviewArr"))
  : [];
const completeArr = JSON.parse(localStorage.getItem("completeArr"))
  ? JSON.parse(localStorage.getItem("completeArr"))
  : [];

// Initialize columns by checking local storage when reopen browser.
render();

// Show "create" button and Hide "reset" and "delete" buttons
addTaskBtn.addEventListener("click", () => {
  resetBtn.style.display = "none";
  deleteBtn.style.display = "none";
  saveBtn.style.display = "block";
  doneBtn.style.display = "none";
  taskName.disabled = false;
  description.disabled = false;
  dueDate.disabled = false;
  assignedPPL.disabled = false;
  statusLabel.style.display = "block";
  status.style.display = "block";

  clearInput();
});

// Trigger Completed Section Show/Hide
let completeBtnCount = 0;
completeBtn.addEventListener("click", () => {
  const angle = document.getElementById("angle");
  if (completeBtnCount === 0) {
    completeCol.style.display = "flex";
    angle.classList.replace("fa-angle-double-down", "fa-angle-double-up");
    completeBtnCount = 1;
  } else {
    completeCol.style.display = "none";
    angle.classList.replace("fa-angle-double-up", "fa-angle-double-down");
    completeBtnCount = 0;
  }
});

// Save data as nested array under different categories - toStart, inProgress, inReview and Completed
saveBtn.addEventListener("click", () => {
  if (
    taskName.value &&
    dueDate.value &&
    assignedPPL.value &&
    checkDateValidation(dueDate)
  ) {
    const obj = new TaskManager(
      taskName.value,
      description.value,
      dueDate.value,
      assignedPPL.value
    );
    switch (status.value) {
      case "to-start":
        obj.status = "to-start";
        obj.id = startArr.length ? startArr.length : 0;
        startArr.push(obj);
        addCard(obj);
        updateLS();
        clearInput();
        break;
      case "in-progress":
        obj.status = "in-progress";
        obj.id = inProgressArr.length ? inProgressArr.length : 0;
        inProgressArr.push(obj);
        addCard(obj);
        updateLS();
        clearInput();
        break;
      case "in-review":
        obj.status = "in-review";
        obj.id = inReviewArr.length ? inReviewArr.length : 0;
        inReviewArr.push(obj);
        addCard(obj);
        updateLS();
        clearInput();
        break;
      case "complete":
        obj.status = "complete";
        obj.id = completeArr.length ? completeArr.length : 0;
        completeArr.push(obj);
        addCard(obj);
        updateLS();
        clearInput();
        break;
      default:
        try {
          break;
        } catch (e) {
          console.log(e);
        }
    }
  } else if (taskName.value === "") {
    alert("Please enter the task name :)");
  } else if (dueDate.value === "") {
    alert("Pease choose a due date for this card :)");
  } else if (assignedPPL.value === "") {
    alert("Please assign this task to someone :)");
  } else if (!checkDateValidation(dueDate)) {
    alert("Please choose a valid due date");
  } else {
    alert("Please enter the required information to complete this card");
  }
});

// Clear form inputs once click the "create" button
function clearInput() {
  document.getElementById("taskName").value = "";
  document.getElementById("description").value = "";
  document.getElementById("dueDate").value = "";
  document.getElementById("assignedPPL").value = "";
  document.getElementById("status").value = "to-start";
}

// Add card to different columns based on category
function addCard(obj) {
  const card = document.createElement("div");
  card.className = "card";
  let statusTemp;
  switch (obj._status) {
    case "to-start":
      document.getElementById("startCol").appendChild(card);
      statusTemp = 0;
      break;
    case "in-progress":
      document.getElementById("inProgressCol").appendChild(card);
      statusTemp = 1;
      break;
    case "in-review":
      document.getElementById("inReviewCol").appendChild(card);
      statusTemp = 2;
      break;
    case "complete":
      document.getElementById("completeCol").appendChild(card);
      statusTemp = 3;
      break;
    default:
      console.log("invalid status type detected");
  }

  card.innerHTML = `
      <div class="card-header">
        <p class="card-title">${obj._name}</p>
        <i class="fas fa-pen" data-bs-toggle="modal"
          data-bs-target="#modal" onClick=resetBtnTrigger(${obj._id},${statusTemp})></i>
      </div>
      <div class="card-description">
        <p>${obj._description}</p>
      </div>
      <div class="card-footer">
        <p class="card-assigned">${obj._assignedTo}</p>
        <p class="due-date">${obj._dueDate}</p>
      </div>
  `;
}

// Show "reset" and "delete" buttons and Hide "create" button
function resetBtnTrigger(index, status) {
  resetBtn.style.display = "block";
  deleteBtn.style.display = "block";
  saveBtn.style.display = "none";
  if (status === 0) {
    toggleCompletedDisplay(status);
    triggerInfo(startArr, index);

    resetBtn.addEventListener("click", () => {
      changeInfo(startArr, index);
    });

    deleteBtn.addEventListener("click", () => {
      deleteCard(startArr, index);
    });

    doneBtn.addEventListener("click", () => {
      cardDone(startArr, index);
    });
  } else if (status === 1) {
    toggleCompletedDisplay(status);
    triggerInfo(inProgressArr, index);

    resetBtn.addEventListener("click", () => {
      changeInfo(inProgressArr, index);
    });

    deleteBtn.addEventListener("click", () => {
      deleteCard(inProgressArr, index);
    });

    doneBtn.addEventListener("click", () => {
      cardDone(inProgressArr, index);
    });
  } else if (status === 2) {
    toggleCompletedDisplay(status);
    triggerInfo(inReviewArr, index);

    resetBtn.addEventListener("click", () => {
      changeInfo(inReviewArr, index);
    });

    deleteBtn.addEventListener("click", () => {
      deleteCard(inReviewArr, index);
    });

    doneBtn.addEventListener("click", () => {
      cardDone(inReviewArr, index);
    });
  } else if (status === 3) {
    toggleCompletedDisplay(status);
    triggerInfo(completeArr, index);

    deleteBtn.addEventListener("click", () => {
      deleteCard(completeArr, index);
    });
  } else {
    try {
      document.getElementById("status").value = "to-start";
    } catch (e) {
      console.log(e);
    }
  }
}

// Update cards for different columns once data changes.
function render() {
  if (startArr) {
    //first check to make sure start array is available
    startArr.forEach((obj) => {
      addCard(obj);
    });
  }
  if (inProgressArr) {
    //first check to make sure in-progress array is available
    inProgressArr.forEach((obj) => {
      addCard(obj);
    });
  }
  if (inReviewArr) {
    //first check to make sure in-review array is available
    inReviewArr.forEach((obj) => {
      addCard(obj);
    });
  }
  if (completeArr) {
    //first check to make sure complete array is available
    completeArr.forEach((obj) => {
      addCard(obj);
    });
  }
}

// Helper function to get specific array and its elements by arr[index]
function triggerInfo(arr, index) {
  taskName.value = arr[index]._name;
  description.value = arr[index]._description;
  dueDate.value = arr[index]._dueDate;
  assignedPPL.value = arr[index]._assignedTo;
  status.value = arr[index]._status;
}

// Helper function to change the data from the selected card
// arrList is the LocalStorage List;
// index is the index number of arr in arrList
function changeInfo(arrList, index) {
  arrList[index]._name = taskName.value;
  arrList[index]._description = description.value;
  arrList[index]._dueDate = dueDate.value;
  arrList[index]._assignedTo = assignedPPL.value;

  const obj = new TaskManager(
    arrList[index]._name,
    arrList[index]._description,
    arrList[index]._dueDate,
    arrList[index]._assignedTo
  );

  // Check if taskName, dueDate and assignedPPL values are valid when try to reset card
  if (
    taskName.value &&
    dueDate.value &&
    assignedPPL.value &&
    checkDateValidation(dueDate)
  ) {
    // Card status used to be toStart
    if (arrList[index]._status === "to-start") {
      if (status.value === "to-start") {
        updateLS();
      } else if (status.value === "in-progress") {
        obj._id = inProgressArr.length ? inProgressArr.length : 0;
        obj._status = "in-progress";
        inProgressArr.push(obj);
        deleteCard(arrList, index);
        addCard(obj);
        updateLS();
      } else if (status.value === "in-review") {
        obj._id = inReviewArr.length ? inReviewArr.length : 0;
        obj._status = "in-review";
        inReviewArr.push(obj);
        deleteCard(arrList, index);
        addCard(obj);
        updateLS();
      } else if (status.value === "complete") {
        obj._id = completeArr.length ? completeArr.length : 0;
        obj._status = "complete";
        completeArr.push(obj);
        deleteCard(arrList, index);
        addCard(obj);
        updateLS();
      } else {
        try {
          console.log(
            "something goes wrong with the status, please try again later"
          );
        } catch (e) {
          console.log(e);
        }
      }
    }

    // Card status used to be inProgress
    if (arrList[index]._status === "in-progress") {
      if (status.value === "in-progress") {
        updateLS();
      } else if (status.value === "to-start") {
        obj._id = startArr.length ? startArr.length : 0;
        obj._status = "to-start";
        startArr.push(obj);
        deleteCard(arrList, index);
        addCard(obj);
        updateLS();
      } else if (status.value === "in-review") {
        obj._id = inReviewArr.length ? inReviewArr.length : 0;
        obj._status = "in-review";
        inReviewArr.push(obj);
        deleteCard(arrList, index);
        addCard(obj);
        updateLS();
      } else if (status.value === "complete") {
        obj._id = completeArr.length ? completeArr.length : 0;
        obj._status = "complete";
        completeArr.push(obj);
        deleteCard(arrList, index);
        addCard(obj);
        updateLS();
      } else {
        try {
          console.log(
            "something goes wrong with the status, please try again later"
          );
        } catch (e) {
          console.log(e);
        }
      }
    }

    // Card status used to be inReview
    if (arrList[index]._status === "in-review") {
      if (status.value === "in-review") {
        updateLS();
      } else if (status.value === "to-start") {
        obj._id = startArr.length ? startArr.length : 0;
        obj._status = "to-start";
        startArr.push(obj);
        deleteCard(arrList, index);
        addCard(obj);
        updateLS();
      } else if (status.value === "in-progress") {
        obj._id = inProgressArr.length ? inProgressArr.length : 0;
        obj._status = "in-progress";
        inProgressArr.push(obj);
        deleteCard(arrList, index);
        addCard(obj);
        updateLS();
      } else if (status.value === "complete") {
        obj._id = completeArr.length ? completeArr.length : 0;
        obj._status = "complete";
        completeArr.push(obj);
        deleteCard(arrList, index);
        addCard(obj);
        updateLS();
      } else {
        try {
          console.log(
            "something goes wrong with the status, please try again later"
          );
        } catch (e) {
          console.log(e);
        }
      }
    }
  } else if (taskName.value === "") {
    alert("Please enter the task name :)");
  } else if (dueDate.value === "") {
    alert("Pease choose a due date for this card :)");
  } else if (!checkDateValidation(dueDate)) {
    alert("Please choose a valid due date");
  } else if (assignedPPL.value === "") {
    alert("Please assign this task to someone :)");
  } else {
    alert("Please enter the required information to complete this card");
  }
}

// Helper function to delete the selected card
function deleteCard(arrList, index) {
  switch (arrList[index]._status) {
    case "to-start":
      startArr.splice(index, 1);
      startArr.forEach((obj) => {
        obj._id = startArr.indexOf(obj);
      });
      updateLS();
      break;
    case "in-progress":
      inProgressArr.splice(index, 1);
      inProgressArr.forEach((obj) => {
        obj._id = inProgressArr.indexOf(obj);
      });
      updateLS();
      break;
    case "in-review":
      inReviewArr.splice(index, 1);
      inReviewArr.forEach((obj) => {
        obj._id = inReviewArr.indexOf(obj);
      });
      updateLS();
      break;
    case "complete":
      completeArr.splice(index, 1);
      completeArr.forEach((obj) => {
        obj._id = completeArr.indexOf(obj);
      });
      updateLS();
      break;
    default:
      try {
        console.log(
          "cannot be able to delete this card, please check the js file;"
        );
      } catch (e) {
        console.log(e);
      }
  }
}

// Helper function to mark selected card status to "done"
function cardDone(arrList, index) {
  const obj = new TaskManager(
    arrList[index]._name,
    arrList[index]._description,
    arrList[index]._dueDate,
    arrList[index]._assignedTo
  );
  obj._id = completeArr.length ? completeArr.length : 0;
  obj._status = "complete";
  completeArr.push(obj);
  deleteCard(arrList, index);
  updateLS();
}

// Helper function to update local storage
function updateLS() {
  localStorage.setItem("startArr", JSON.stringify(startArr));
  localStorage.setItem("inProgressArr", JSON.stringify(inProgressArr));
  localStorage.setItem("inReviewArr", JSON.stringify(inReviewArr));
  localStorage.setItem("completeArr", JSON.stringify(completeArr));
}

// Change style of reset and delete button, as well as form disabled when card change into complete status
function toggleCompletedDisplay(currentStatus) {
  if (currentStatus === 3 || currentStatus === "complete") {
    resetBtn.style.display = "none";
    deleteBtn.style.width = "100%";
    doneBtn.style.display = "none";
    taskName.disabled = true;
    description.disabled = true;
    dueDate.disabled = true;
    assignedPPL.disabled = true;
    statusLabel.style.display = "none";
    status.style.display = "none";
  } else {
    resetBtn.style.display = "block";
    deleteBtn.style.display = "block";
    doneBtn.style.display = "block";
    deleteBtn.style.width = "45%";
    taskName.disabled = false;
    description.disabled = false;
    dueDate.disabled = false;
    assignedPPL.disabled = false;
    statusLabel.style.display = "block";
    status.style.display = "block";
  }
}

// Helper function to check due date is valid or not
function checkDateValidation(dueDate) {
  const dueDateYY = dueDate.value.slice(0, 4);
  const dueDateMM = dueDate.value.slice(5, 7);
  const dueDateDD = dueDate.value.slice(8, 10);
  const currentDateYY = new Date().toISOString().slice(0, 4);
  const currentDateMM = new Date().toISOString().slice(5, 7);
  const currentDateDD = new Date().toISOString().slice(8, 10);

  if (dueDateYY > currentDateYY) return true;
  else if (dueDateYY < currentDateYY) return false;
  else {
    if (dueDateMM > currentDateMM) return true;
    else if (dueDateMM < currentDateMM) return false;
    else {
      if (dueDateDD >= currentDateDD) return true;
      else return false;
    }
  }
}
