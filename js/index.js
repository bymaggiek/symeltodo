const startCol = document.getElementById("startCol");
const inProgressCol = document.getElementById("inProgressCol");
const inReviewCol = document.getElementById("inReviewCol");
const completeBtn = document.getElementById("completeBtn");
const completeCol = document.getElementById("completeCol");
const angle = document.getElementById("angle");

const saveBtn = document.getElementById("saveBtn");
const resetBtn = document.getElementById("resetBtn");
const deleteBtn = document.getElementById("deleteBtn");
const addTaskBtn = document.getElementById("addCardForm");

const taskName = document.getElementById("taskName");
const description = document.getElementById("description");
const dueDate = document.getElementById("dueDate");
const assignedPPL = document.getElementById("assignedPPL");
const status = document.getElementById("status");

const startArr = JSON.parse(localStorage.getItem("startArr"))
  ? JSON.parse(localStorage.getItem("startArr"))
  : [];
const inProgressArr = JSON.parse(localStorage.getItem("inProgressArr"))
  ? JSON.parse(localStorage.getItem("inProgressArr"))
  : [];
const inReviewArr = JSON.parse(localStorage.getItem("inReviewArr"))
  ? JSON.parse(localStorage.getItem("inReviewArr"))
  : [];
const completedArr = JSON.parse(localStorage.getItem("completeArr"))
  ? JSON.parse(localStorage.getItem("completeArr"))
  : [];
if (startArr) {
  startArr.forEach((arr) => {
    addCard(arr, "to-start");
  });
}
if (inProgressArr) {
  inProgressArr.forEach((arr) => {
    addCard(arr, "in-progress");
  });
}
if (inReviewArr) {
  inReviewArr.forEach((arr) => {
    addCard(arr, "in-review");
  });
}
if (completedArr) {
  completedArr.forEach((arr) => {
    addCard(arr, "complete");
  });
}
let completeBtnCount = 0;

// Show "create" button and Hide "reset" and "delete" buttons
addTaskBtn.addEventListener("click", () => {
  resetBtn.style.display = "none";
  deleteBtn.style.display = "none";
  saveBtn.style.display = "block";
  clearInput();
});

// Trigger Completed Section Show/Hide
completeBtn.addEventListener("click", () => {
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
  if (taskName.value && dueDate.value && assignedPPL.value) {
    switch (status.value) {
      case "to-start":
        const startSub = [
          startArr.length,
          taskName.value,
          description.value,
          dueDate.value,
          assignedPPL.value,
          0,
        ];
        startArr.push(startSub);
        localStorage.setItem("startArr", JSON.stringify(startArr));
        addCard(startSub, "to-start");
        addCard.called ? clearInput() : console.log("finish the card first");
        break;

      case "in-progress":
        const progressSub = [
          inProgressArr.length,
          taskName.value,
          description.value,
          dueDate.value,
          assignedPPL.value,
          1,
        ];
        inProgressArr.push(progressSub);
        localStorage.setItem("inProgressArr", JSON.stringify(inProgressArr));
        addCard(progressSub, "in-progress");
        addCard.called ? clearInput() : console.log("finish the card first");
        break;

      case "in-review":
        const reviewSub = [
          inReviewArr.length,
          taskName.value,
          description.value,
          dueDate.value,
          assignedPPL.value,
          2,
        ];
        inReviewArr.push(reviewSub);
        localStorage.setItem("inReviewArr", JSON.stringify(inReviewArr));
        addCard(reviewSub, "in-review");
        addCard.called ? clearInput() : console.log("finish the card first");
        break;

      case "complete":
        const completeSub = [
          completedArr.length,
          taskName.value,
          description.value,
          dueDate.value,
          assignedPPL.value,
          3,
        ];
        completedArr.push(completeSub);
        localStorage.setItem("completeArr", JSON.stringify(completedArr));
        addCard(completeSub, "complete");
        addCard.called ? clearInput() : console.log("finish the card first");
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

// Reset data for the chosen card
resetBtn.addEventListener("click", () => {});

// Delete card from LS

// Show "reset" and "delete" buttons and Hide "create" button
function resetBtnTrigger(index, status) {
  resetBtn.style.display = "block";
  deleteBtn.style.display = "block";
  saveBtn.style.display = "none";

  if (status === 0) {
    document.getElementById("status").value = "to-start";
    const triggeredArr = JSON.parse(localStorage.getItem("startArr"));
    triggerInfo(triggeredArr, index);
  } else if (status === 1) {
    document.getElementById("status").value = "in-progress";
    const triggeredArr = JSON.parse(localStorage.getItem("inProgressArr"));
    triggerInfo(triggeredArr, index);
  } else if (status === 2) {
    document.getElementById("status").value = "in-review";
    const triggeredArr = JSON.parse(localStorage.getItem("inReviewArr"));
    triggerInfo(triggeredArr, index);
  } else if (status === 3) {
    document.getElementById("status").value = "complete";
    const triggeredArr = JSON.parse(localStorage.getItem("completedArr"));
    triggerInfo(triggeredArr, index);
  } else {
    try {
      document.getElementById("status").value = "to-start";
    } catch (e) {
      console.log(e);
    }
  }
}
// Helper function to get specific array and its elements by arr[index]
function triggerInfo(arr, index) {
  taskName.value = arr[index][1];
  description.value = arr[index][2];
  dueDate.value = arr[index][3];
  assignedPPL.value = arr[index][4];
  for (a in arr) {
    if (arr[index][5] === 0) {
      status.value = "to-start";
    } else if (arr[index][5] === 1) {
      status.value = "in-progress";
    } else if (arr[index][5] === 2) {
      status.value = "in-review";
    } else if (arr[index][5] === 3) {
      status.value = "complete";
    } else {
      try {
        status.value = "to-start";
      } catch (e) {
        console.log(e);
      }
    }
  }
  tempArr = [
    taskName.value,
    description.value,
    dueDate.value,
    assignedPPL.value,
    status.value,
  ];
}

// Add card to different columns based on category
function addCard(arr, status) {
  const card = document.createElement("div");
  card.className = "card";
  addCard.called = true;

  if (status === "to-start") {
    const cardDisplay = document.getElementById("startCol");
    cardDisplay.appendChild(card);
  } else if (status === "in-progress") {
    const cardDisplay = document.getElementById("inProgressCol");
    cardDisplay.appendChild(card);
  } else if (status === "in-review") {
    const cardDisplay = document.getElementById("inReviewCol");
    cardDisplay.appendChild(card);
  } else if (status === "complete") {
    const cardDisplay = document.getElementById("completeCol");
    cardDisplay.appendChild(card);
  } else {
    console.log("invalid status type detected");
  }
  card.innerHTML = `
      <div class="card-header">
        <p class="card-title">${arr[1]}</p>
        <i class="fas fa-pen" data-bs-toggle="modal"
          data-bs-target="#modal" onClick=resetBtnTrigger(${arr[0]},${arr[5]})></i>
      </div>
      <div class="card-description">
        <p>${arr[2]}</p>
      </div>
      <div class="card-footer">
        <p class="card-assigned">${arr[4]}</p>
        <p class="due-date">${arr[3]}</p>
      </div>
  `;
}

// Clear form inputs once click the "create" button
function clearInput() {
  document.getElementById("taskName").value = "";
  document.getElementById("description").value = "";
  document.getElementById("dueDate").value = "";
  document.getElementById("assignedPPL").value = "";
  document.getElementById("status").value = "to-start";
}

function changeCardInfo(arr) {}
