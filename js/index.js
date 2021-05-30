const completeBtn = document.getElementById("completeBtn");
const completeCol = document.getElementById("completeCol");
const angle = document.getElementById("angle");

const taskName = document.getElementById("taskName");
const description = document.getElementById("description");
const dueDate = document.getElementById("dueDate");
const assignedPPL = document.getElementById("assignedPPL");
const status = document.getElementById("status");

const startCol = document.getElementById("startCol");
const inProgressCol = document.getElementById("inProgressCol");
const inReviewCol = document.getElementById("inReviewCol");

const card = document.createElement("div"); // .card
const cardHeader = document.createElement("div"); //.card-header
const cardHeaderP = document.createElement("p"); // .card-header > p
const cardHeaderI = document.createElement("i"); // .card-header > i
const cardDescription = document.createElement("div"); // .card-description
const cardDescriptionP = document.createElement("p"); // .card-description > p
const cardFooter = document.createElement("div"); //.card-footer
const cardAssigned = document.createElement("p"); // .card-footer > p
const cardDueDate = document.createElement("p"); // .card-footer > p

const saveBtn = document.getElementById("saveBtn");

let completeBtnCount = 0;

// Trigger Completed Section Show/Hide
completeBtn.onclick = () => {
  if (completeBtnCount === 0) {
    completeCol.style.display = "flex";
    angle.classList.replace("fa-angle-double-down", "fa-angle-double-up");
    completeBtnCount = 1;
  } else {
    completeCol.style.display = "none";
    angle.classList.replace("fa-angle-double-up", "fa-angle-double-down");
    completeBtnCount = 0;
  }
};

// Save data as nested array under different categories - toStart, inProgress, inReview and Completed
saveBtn.onclick = () => {
  if (taskName.value && dueDate.value && assignedPPL) {
    switch (status.value) {
      case "to-start":
        const startArr = JSON.parse(localStorage.getItem("startArr"))
          ? JSON.parse(localStorage.getItem("startArr"))
          : [];
        const newArr = [
          startArr.length,
          taskName.value,
          description.value,
          dueDate.value,
          assignedPPL.value,
          status.value,
        ];
        startArr.push(newArr);
        localStorage.setItem("startArr", JSON.stringify(startArr));
        addToColumn(newArr[newArr.length - 1], newArr);
        break;

      case "in-progress":
        const inProgressArr = JSON.parse(localStorage.getItem("inProgressArr"))
          ? JSON.parse(localStorage.getItem("inProgressArr"))
          : [];
        inProgressArr.push([
          inProgressArr.length,
          taskName.value,
          description.value,
          dueDate.value,
          assignedPPL.value,
          status.value,
        ]);
        localStorage.setItem("inProgressArr", JSON.stringify(inProgressArr));
        break;

      case "in-review":
        const inReviewArr = JSON.parse(localStorage.getItem("inReviewArr"))
          ? JSON.parse(localStorage.getItem("inReviewArr"))
          : [];
        inReviewArr.push([
          inReviewArr.length,
          taskName.value,
          description.value,
          dueDate.value,
          assignedPPL.value,
          status.value,
        ]);
        localStorage.setItem("inReviewArr", JSON.stringify(inReviewArr));
        break;

      case "complete":
        const completedArr = JSON.parse(localStorage.getItem("completedArr"))
          ? JSON.parse(localStorage.getItem("completedArr"))
          : [];
        completedArr.push([
          completedArr.length,
          taskName.value,
          description.value,
          dueDate.value,
          assignedPPL.value,
          status.value,
        ]);
        localStorage.setItem("completeArr", JSON.stringify(completedArr));
        break;

      default:
        try {
          break;
        } catch (e) {
          console.log(e);
        }
    }
  }
};

// Add card to different columns based on category

addToColumn = (status, str) => {
  cardHeaderP.innerHTML = `${str[1]}`;
  cardHeaderI.className = "fas fa-pen";
  cardHeader.appendChild(cardHeaderP);
  cardHeader.appendChild(cardHeaderI);

  cardDescriptionP.innerHTML = `${str[2]}`;
  cardDescription.appendChild(cardDescriptionP);

  cardAssigned.innerHTML = `${str[4]}`;
  cardDueDate.innerHTML = `${str[3]}`;
  cardFooter.appendChild(cardAssigned);
  cardFooter.appendChild(cardDueDate);

  card.appendChild(cardHeader);
  card.appendChild(cardDescription);
  card.appendChild(cardFooter);

  switch (status) {
    case "to-start":
      startCol.appendChild(card);
      break;

    case "in-progress":
      inProgressCol.appendChild(card);
      break;

    case "in-review":
      inReviewCol.appendChild(card);
      break;

    case "complete":
      completeCol.appendChild(card);
      break;

    default:
      try {
        break;
      } catch (e) {
        console.log(e);
      }
  }
};
cardHeaderP.innerHTML = `1564561230`;
cardHeaderI.className = "fas fa-pen";
cardHeader.appendChild(cardHeaderP);
cardHeader.appendChild(cardHeaderI);
cardDescriptionP.innerHTML = `badfhbsfghsf`;
cardDescription.appendChild(cardDescriptionP);
cardAssigned.innerHTML = `dfgs7a4dhb2sfdg}`;
cardDueDate.innerHTML = `bsfg445hf21`;
cardFooter.appendChild(cardAssigned);
cardFooter.appendChild(cardDueDate);
card.appendChild(cardHeader);
card.appendChild(cardDescription);
card.appendChild(cardFooter);
startCol.appendChild(card);
