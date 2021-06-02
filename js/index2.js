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
  const obj = new TaskManager(
    taskName.value,
    description.value,
    dueDate.value,
    assignedPPL.value
  );
  if (taskName.value && dueDate.value && assignedPPL.value) {
    switch (status.value) {
      case "to-start":
        startArr.push(obj);
        obj.status = "to-start";
        obj.id = startArr.length > 0 ? startArr.length : 1;
        addCard(obj);
        updateLS();
        clearInput();
        break;
      case "in-progress":
        inProgressArr.push(obj);
        obj.status = "in-progress";
        obj.id = inProgressArr.length > 0 ? inProgressArr.length : 1;
        addCard(obj);
        updateLS();
        clearInput();
        break;
      case "in-review":
        inReviewArr.push(obj);
        obj.status = "in-review";
        obj.id = inReviewArr.length > 0 ? inReviewArr.length : 1;
        addCard(obj);
        updateLS();
        clearInput();
        break;
      case "complete":
        completeArr.push(obj);
        obj.status = "complete";
        obj.id = completeArr.length > 0 ? completeArr.length : 1;
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
function resetBtnTrigger(index, Status) {
  resetBtn.style.display = "block";
  deleteBtn.style.display = "block";
  saveBtn.style.display = "none";

  if (Status === 0) {
    toggleCompletedDisplay(Status);
    document.getElementById("status").value = "to-start";
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
  } else if (Status === 1) {
    toggleCompletedDisplay(Status);
    document.getElementById("status").value = "in-progress";
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
  } else if (Status === 2) {
    toggleCompletedDisplay(Status);
    document.getElementById("status").value = "in-review";
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
  } else if (Status === 3) {
    toggleCompletedDisplay(Status);
    document.getElementById("status").value = "complete";
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
  taskName.value = arr[index - 1]._name;
  description.value = arr[index - 1]._description;
  dueDate.value = arr[index - 1]._dueDate;
  assignedPPL.value = arr[index - 1]._assignedTo;
  return [
    taskName.value,
    description.value,
    dueDate.value,
    assignedPPL.value,
    status.value,
  ];
}

// Helper function to change the data from the selected card
// arrList is the LocalStorage List;
// index is the index number of arr in arrList
function changeInfo(arrList, index) {
  arrList[index - 1]._name = taskName.value;
  arrList[index - 1]._description = description.value;
  arrList[index - 1]._dueDate = dueDate.value;
  arrList[index - 1]._assignedTo = assignedPPL.value;

  const obj = new TaskManager(
    arrList[index - 1]._name,
    arrList[index - 1]._description,
    arrList[index - 1]._dueDate,
    arrList[index - 1]._assignedTo
  );

  // Card status used to be toStart
  if (arrList[index - 1]._status === "to-start") {
    if (status.value === "to-start") {
      updateLS();
    } else if (status.value === "in-progress") {
      obj._id = inProgressArr.length > 0 ? inProgressArr.length : 1;
      obj._status = "in-progress";
      inProgressArr.push(obj);
      deleteCard(arrList, index);
      updateLS();
    } else if (status.value === "in-review") {
      obj._id = inReviewArr.length > 0 ? inReviewArr.length : 1;
      obj._status = "in-review";
      inReviewArr.push(obj);
      deleteCard(arrList, index);
      updateLS();
    } else if (status.value === "complete") {
      obj._id = completeArr.length > 0 ? completeArr.length : 1;
      obj._status = "complete";
      completeArr.push(obj);
      deleteCard(arrList, index);
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
  if (arrList[index - 1]._status === "in-progress") {
    if (status.value === "in-progress") {
      updateLS();
    } else if (status.value === "to-start") {
      obj._id = startArr.length > 0 ? startArr.length : 1;
      obj._status = "to-start";
      startArr.push(obj);
      deleteCard(arrList, index);
      updateLS();
    } else if (status.value === "in-review") {
      obj._id = inReviewArr.length > 0 ? inReviewArr.length : 1;
      obj._status = "in-review";
      inReviewArr.push(obj);
      deleteCard(arrList, index);
      updateLS();
    } else if (status.value === "complete") {
      obj._id = completeArr.length > 0 ? completeArr.length : 1;
      obj._status = "complete";
      completeArr.push(obj);
      deleteCard(arrList, index);
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
  if (arrList[index - 1]._status === "in-review") {
    if (status.value === "in-review") {
      updateLS();
    } else if (status.value === "to-start") {
      obj._id = startArr.length > 0 ? startArr.length : 1;
      obj._status = "to-start";
      startArr.push(obj);
      deleteCard(arrList, index);
      updateLS();
    } else if (status.value === "in-progress") {
      obj._id = inProgressArr.length > 0 ? inProgressArr.length : 1;
      obj._status = "in-progress";
      inProgressArr.push(obj);
      deleteCard(arrList, index);
      updateLS();
    } else if (status.value === "complete") {
      obj._id = completeArr.length > 0 ? completeArr.length : 1;
      obj._status = "complete";
      completeArr.push(obj);
      deleteCard(arrList, index);
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
}

// Helper function to delete the selected card
function deleteCard(arrList, index) {
  switch (arrList[index - 1]._status) {
    case "to-start":
      startArr.splice(index - 1, 1);
      startArr.forEach((obj) => {
        obj._id = startArr.indexOf(obj) + 1;
      });
      updateLS();
      break;
    case "in-progress":
      inProgressArr.splice(index - 1, 1);
      inProgressArr.forEach((obj) => {
        obj._id = inProgressArr.indexOf(obj) + 1;
      });
      updateLS();
      break;
    case "in-review":
      inReviewArr.splice(index - 1, 1);
      inReviewArr.forEach((obj) => {
        obj._id = inReviewArr.indexOf(obj) + 1;
      });
      updateLS();
      break;
    case "complete":
      completeArr.splice(index - 1, 1);
      completeArr.forEach((obj) => {
        obj._id = completeArr.indexOf(obj) + 1;
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
    arrList[index - 1]._name,
    arrList[index - 1]._description,
    arrList[index - 1]._dueDate,
    arrList[index - 1]._assignedTo
  );
  obj._id = completeArr.length > 0 ? completeArr.length : 1;
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

  render();
}

// Change style of reset and delete button, as well as form disabled when card change into complete status
function toggleCompletedDisplay(Status) {
  if (Status === 3 || Status === "complete") {
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
