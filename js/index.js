// const startCol = document.getElementById("startCol");
// const inProgressCol = document.getElementById("inProgressCol");
// const inReviewCol = document.getElementById("inReviewCol");
// const completeBtn = document.getElementById("completeBtn");
// const completeCol = document.getElementById("completeCol");

// const saveBtn = document.getElementById("saveBtn");
// const resetBtn = document.getElementById("resetBtn");
// const deleteBtn = document.getElementById("deleteBtn");
// const addTaskBtn = document.getElementById("addCardForm");

// const taskName = document.getElementById("taskName");
// const description = document.getElementById("description");
// const dueDate = document.getElementById("dueDate");
// const assignedPPL = document.getElementById("assignedPPL");
// const status = document.getElementById("status");

// const startArr = JSON.parse(localStorage.getItem("startArr"))
//   ? JSON.parse(localStorage.getItem("startArr"))
//   : [];
// const inProgressArr = JSON.parse(localStorage.getItem("inProgressArr"))
//   ? JSON.parse(localStorage.getItem("inProgressArr"))
//   : [];
// const inReviewArr = JSON.parse(localStorage.getItem("inReviewArr"))
//   ? JSON.parse(localStorage.getItem("inReviewArr"))
//   : [];
// const completeArr = JSON.parse(localStorage.getItem("completeArr"))
//   ? JSON.parse(localStorage.getItem("completeArr"))
//   : [];

// updateCards();

// function updateCards() {
//   if (startArr) {
//     startArr.forEach((arr) => {
//       addCard(arr, "to-start");
//     });
//   }
//   if (inProgressArr) {
//     inProgressArr.forEach((arr) => {
//       addCard(arr, "in-progress");
//     });
//   }
//   if (inReviewArr) {
//     inReviewArr.forEach((arr) => {
//       addCard(arr, "in-review");
//     });
//   }
//   if (completeArr) {
//     completeArr.forEach((arr) => {
//       addCard(arr, "complete");
//     });
//   }
// }

// // Show "create" button and Hide "reset" and "delete" buttons
// addTaskBtn.addEventListener("click", () => {
//   resetBtn.style.display = "none";
//   deleteBtn.style.display = "none";
//   saveBtn.style.display = "block";
//   clearInput();
// });

// // Trigger Completed Section Show/Hide
// let completeBtnCount = 0;
// completeBtn.addEventListener("click", () => {
//   const angle = document.getElementById("angle");
//   if (completeBtnCount === 0) {
//     completeCol.style.display = "flex";
//     angle.classList.replace("fa-angle-double-down", "fa-angle-double-up");
//     completeBtnCount = 1;
//   } else {
//     completeCol.style.display = "none";
//     angle.classList.replace("fa-angle-double-up", "fa-angle-double-down");
//     completeBtnCount = 0;
//   }
// });

// // Save data as nested array under different categories - toStart, inProgress, inReview and Completed
// saveBtn.addEventListener("click", () => {
//   if (taskName.value && dueDate.value && assignedPPL.value) {
//     switch (status.value) {
//       case "to-start":
//         const startSub = [
//           startArr.length,
//           taskName.value,
//           description.value,
//           dueDate.value,
//           assignedPPL.value,
//           0,
//         ];
//         startArr.push(startSub);
//         localStorage.setItem("startArr", JSON.stringify(startArr));
//         addCard(startSub, "to-start");
//         addCard.called ? clearInput() : console.log("finish the card first");
//         break;

//       case "in-progress":
//         const progressSub = [
//           inProgressArr.length,
//           taskName.value,
//           description.value,
//           dueDate.value,
//           assignedPPL.value,
//           1,
//         ];
//         inProgressArr.push(progressSub);
//         localStorage.setItem("inProgressArr", JSON.stringify(inProgressArr));
//         addCard(progressSub, "in-progress");
//         addCard.called ? clearInput() : console.log("finish the card first");
//         break;

//       case "in-review":
//         const reviewSub = [
//           inReviewArr.length,
//           taskName.value,
//           description.value,
//           dueDate.value,
//           assignedPPL.value,
//           2,
//         ];
//         inReviewArr.push(reviewSub);
//         localStorage.setItem("inReviewArr", JSON.stringify(inReviewArr));
//         addCard(reviewSub, "in-review");
//         addCard.called ? clearInput() : console.log("finish the card first");
//         break;

//       case "complete":
//         const completeSub = [
//           completeArr.length,
//           taskName.value,
//           description.value,
//           dueDate.value,
//           assignedPPL.value,
//           3,
//         ];
//         completeArr.push(completeSub);
//         localStorage.setItem("completeArr", JSON.stringify(completeArr));
//         addCard(completeSub, "complete");
//         addCard.called ? clearInput() : console.log("finish the card first");
//         break;

//       default:
//         try {
//           break;
//         } catch (e) {
//           console.log(e);
//         }
//     }
//   }
// });

// Show "reset" and "delete" buttons and Hide "create" button
// function resetBtnTrigger(index, status) {
//   resetBtn.style.display = "block";
//   deleteBtn.style.display = "block";
//   saveBtn.style.display = "none";

//   if (status === 0) {
//     document.getElementById("status").value = "to-start";
//     triggerInfo(startArr, index);

//     resetBtn.addEventListener("click", () => {
//       changeInfo(startArr, index);
//     });

//     deleteBtn.addEventListener("click", () => {
//       deleteCard(startArr, index);
//     });
//   } else if (status === 1) {
//     document.getElementById("status").value = "in-progress";
//     triggerInfo(inProgressArr, index);

//     resetBtn.addEventListener("click", () => {
//       changeInfo(inProgressArr, index);
//     });

//     deleteBtn.addEventListener("click", () => {
//       deleteCard(inProgressArr, index);
//     });
//   } else if (status === 2) {
//     document.getElementById("status").value = "in-review";
//     triggerInfo(inReviewArr, index);

//     resetBtn.addEventListener("click", () => {
//       changeInfo(inReviewArr, index);
//     });

//     deleteBtn.addEventListener("click", () => {
//       deleteCard(inReviewArr, index);
//     });
//   } else if (status === 3) {
//     document.getElementById("status").value = "complete";
//     triggerInfo(completeArr, index);

//     resetBtn.addEventListener("click", () => {
//       changeInfo(completeArr, index);
//     });

//     deleteBtn.addEventListener("click", () => {
//       deleteCard(completeArr, index);
//     });
//   } else {
//     try {
//       document.getElementById("status").value = "to-start";
//     } catch (e) {
//       console.log(e);
//     }
//   }
// }
// // Helper function to get specific array and its elements by arr[index]
// function triggerInfo(arr, index) {
//   taskName.value = arr[index][1];
//   description.value = arr[index][2];
//   dueDate.value = arr[index][3];
//   assignedPPL.value = arr[index][4];
//   for (a in arr) {
//     if (arr[index][5] === 0) {
//       status.value = "to-start";
//     } else if (arr[index][5] === 1) {
//       status.value = "in-progress";
//     } else if (arr[index][5] === 2) {
//       status.value = "in-review";
//     } else if (arr[index][5] === 3) {
//       status.value = "complete";
//     } else {
//       try {
//         status.value = "to-start";
//       } catch (e) {
//         console.log(e);
//       }
//     }
//   }
//   return [
//     taskName.value,
//     description.value,
//     dueDate.value,
//     assignedPPL.value,
//     status.value,
//   ];
// }

// Helper function to change the data from the selected card
// arrList is the LocalStorage List;
// index is the index number of arr in arrList
// function changeInfo(arrList, index) {
//   arrList[index][1] = taskName.value;
//   arrList[index][2] = description.value;
//   arrList[index][3] = dueDate.value;
//   arrList[index][4] = assignedPPL.value;

//   if (arrList[index][5] === 0) {
//     if (status.value === "to-start") {
//       localStorage.setItem("startArr", JSON.stringify(arrList));
//     } else if (status.value === "in-progress") {
//       const newArr = [
//         inProgressArr.length > 0
//           ? inProgressArr[inProgressArr.length - 1][0] + 1
//           : 0,
//         arrList[index][1],
//         arrList[index][2],
//         arrList[index][3],
//         arrList[index][4],
//         1,
//       ];
//       inProgressArr.push(newArr);
//       startArr.splice(index, 1);
//       startArr.forEach((arr) => {
//         arr[0] = startArr.indexOf(arr);
//       });
//       localStorage.setItem("startArr", JSON.stringify(startArr));
//       localStorage.setItem("inProgressArr", JSON.stringify(inProgressArr));
//     } else if (status.value === "in-review") {
//       const newArr = [
//         inReviewArr.length > 0 ? inReviewArr[inReviewArr.length - 1][0] + 1 : 0,
//         arrList[index][1],
//         arrList[index][2],
//         arrList[index][3],
//         arrList[index][4],
//         2,
//       ];
//       inReviewArr.push(newArr);
//       startArr.splice(index, 1);
//       startArr.forEach((arr) => {
//         arr[0] = startArr.indexOf(arr);
//       });
//       localStorage.setItem("startArr", JSON.stringify(startArr));
//       localStorage.setItem("inReviewArr", JSON.stringify(inReviewArr));
//     } else if (status.value === "complete") {
//       const newArr = [
//         completeArr.length > 0 ? completeArr[completeArr.length - 1][0] + 1 : 0,
//         arrList[index][1],
//         arrList[index][2],
//         arrList[index][3],
//         arrList[index][4],
//         3,
//       ];
//       completeArr.push(newArr);
//       startArr.splice(index, 1);
//       startArr.forEach((arr) => {
//         arr[0] = startArr.indexOf(arr);
//       });
//       localStorage.setItem("startArr", JSON.stringify(startArr));
//       localStorage.setItem("completeArr", JSON.stringify(completeArr));
//     } else {
//       try {
//         console.log(
//           "something goes wrong with the status, please try again later"
//         );
//       } catch (e) {
//         console.log(e);
//       }
//     }
//   } else if (arrList[index][5] === 1) {
//     if (status.value === "in-progress") {
//       localStorage.setItem("inProgressArr", JSON.stringify(arrList));
//     } else if (status.value === "to-start") {
//       const newArr = [
//         startArr.length > 0 ? startArr[startArr.length - 1][0] + 1 : 0,
//         taskName.value,
//         description.value,
//         dueDate.value,
//         assignedPPL.value,
//         0,
//       ];
//       startArr.push(newArr);
//       inProgressArr.splice(index, 1);
//       inProgressArr.forEach((arr) => {
//         arr[0] = inProgressArr.indexOf(arr);
//       });
//       localStorage.setItem("inProgressArr", JSON.stringify(inProgressArr));
//       localStorage.setItem("startArr", JSON.stringify(startArr));
//     } else if (status.value === "in-review") {
//       const newArr = [
//         inReviewArr.length > 0 ? inReviewArr[inReviewArr.length - 1][0] + 1 : 0,
//         arrList[index][1],
//         arrList[index][2],
//         arrList[index][3],
//         arrList[index][4],
//         2,
//       ];
//       inReviewArr.push(newArr);
//       inProgressArr.splice(index, 1);
//       inProgressArr.forEach((arr) => {
//         arr[0] = inProgressArr.indexOf(arr);
//       });
//       localStorage.setItem("inProgressArr", JSON.stringify(inProgressArr));
//       localStorage.setItem("inReviewArr", JSON.stringify(inReviewArr));
//     } else if (status.value === "complete") {
//       const newArr = [
//         completeArr.length > 0 ? completeArr[completeArr.length - 1][0] + 1 : 0,
//         arrList[index][1],
//         arrList[index][2],
//         arrList[index][3],
//         arrList[index][4],
//         3,
//       ];
//       completeArr.push(newArr);
//       inProgressArr.splice(index, 1);
//       inProgressArr.forEach((arr) => {
//         arr[0] = inProgressArr.indexOf(arr);
//       });
//       localStorage.setItem("inProgressArr", JSON.stringify(inProgressArr));
//       localStorage.setItem("completeArr", JSON.stringify(completeArr));
//     } else {
//       try {
//         console.log(
//           "something goes wrong with the status, please try again later"
//         );
//       } catch (e) {
//         console.log(e);
//       }
//     }
//   } else if (arrList[index][5] === 2) {
//     if (status.value === "in-review") {
//       localStorage.setItem("inReviewArr", JSON.stringify(arrList));
//     } else if (status.value === "to-start") {
//       const newArr = [
//         startArr.length > 0 ? startArr[startArr.length - 1][0] + 1 : 0,
//         arrList[index][1],
//         arrList[index][2],
//         arrList[index][3],
//         arrList[index][4],
//         0,
//       ];
//       startArr.push(newArr);
//       inReviewArr.splice(index, 1);
//       inReviewArr.forEach((arr) => {
//         arr[0] = inReviewArr.indexOf(arr);
//       });
//       localStorage.setItem("inReviewArr", JSON.stringify(inReviewArr));
//       localStorage.setItem("startArr", JSON.stringify(startArr));
//     } else if (status.value === "in-progress") {
//       const newArr = [
//         inProgressArr.length > 0
//           ? inProgressArr[inProgressArr.length - 1][0] + 1
//           : 0,
//         arrList[index][1],
//         arrList[index][2],
//         arrList[index][3],
//         arrList[index][4],
//         1,
//       ];
//       inProgressArr.push(newArr);
//       inReviewArr.splice(index, 1);
//       inReviewArr.forEach((arr) => {
//         arr[0] = inReviewArr.indexOf(arr);
//       });
//       localStorage.setItem("inReviewArr", JSON.stringify(inReviewArr));
//       localStorage.setItem("inProgressArr", JSON.stringify(inProgressArr));
//     } else if (status.value === "complete") {
//       const newArr = [
//         completeArr.length > 0 ? completeArr[completeArr.length - 1][0] + 1 : 0,
//         arrList[index][1],
//         arrList[index][2],
//         arrList[index][3],
//         arrList[index][4],
//         3,
//       ];
//       completeArr.push(newArr);
//       inReviewArr.splice(index, 1);
//       inReviewArr.forEach((arr) => {
//         arr[0] = inReviewArr.indexOf(arr);
//       });
//       localStorage.setItem("inReviewArr", JSON.stringify(inReviewArr));
//       localStorage.setItem("completeArr", JSON.stringify(completeArr));
//     } else {
//       try {
//         console.log(
//           "something goes wrong with the status, please try again later"
//         );
//       } catch (e) {
//         console.log(e);
//       }
//     }
//   } else if (arrList[index][5] === 3) {
//     if (status.value === "complete") {
//       localStorage.setItem("completeArr", JSON.stringify(arrList));
//     } else if (status.value === "to-start") {
//       const newArr = [
//         startArr.length > 0 ? startArr[startArr.length - 1][0] + 1 : 0,
//         arrList[index][1],
//         arrList[index][2],
//         arrList[index][3],
//         arrList[index][4],
//         0,
//       ];
//       startArr.push(newArr);
//       completeArr.splice(index, 1);
//       completeArr.forEach((arr) => {
//         arr[0] = completeArr.indexOf(arr);
//       });
//       localStorage.setItem("completeArr", JSON.stringify(completeArr));
//       localStorage.setItem("startArr", JSON.stringify(startArr));
//     } else if (status.value === "in-progress") {
//       const newArr = [
//         inProgressArr.length > 0
//           ? inProgressArr[inProgressArr.length - 1][0] + 1
//           : 0,
//         arrList[index][1],
//         arrList[index][2],
//         arrList[index][3],
//         arrList[index][4],
//         1,
//       ];
//       inProgressArr.push(newArr);
//       completeArr.splice(index, 1);
//       completeArr.forEach((arr) => {
//         arr[0] = completeArr.indexOf(arr);
//       });
//       localStorage.setItem("completeArr", JSON.stringify(completeArr));
//       localStorage.setItem("inProgressArr", JSON.stringify(inProgressArr));
//     } else if (status.value === "in-review") {
//       const newArr = [
//         inReviewArr.length > 0 ? inReviewArr[inReviewArr.length - 1][0] + 1 : 0,
//         arrList[index][1],
//         arrList[index][2],
//         arrList[index][3],
//         arrList[index][4],
//         2,
//       ];
//       inReviewArr.push(newArr);
//       completeArr.splice(index, 1);
//       completeArr.forEach((arr) => {
//         arr[0] = completeArr.indexOf(arr);
//       });
//       localStorage.setItem("completeArr", JSON.stringify(completeArr));
//       localStorage.setItem("inReviewArr", JSON.stringify(inReviewArr));
//     } else {
//       try {
//         console.log(
//           "something goes wrong with the status, please try again later"
//         );
//       } catch (e) {
//         console.log(e);
//       }
//     }
//   } else {
//     try {
//       console.log("Invalid status input, please try again");
//     } catch (e) {
//       console.log(e);
//     }
//   }

//   updateCards();
// }

// // Helper function to delete the selected card
// function deleteCard(arrList, index) {
//   switch (arrList[index][5]) {
//     case 0:
//       startArr.splice(index, 1);
//       startArr.forEach((arr) => {
//         arr[0] = startArr.indexOf(arr);
//       });
//       localStorage.setItem("startArr", JSON.stringify(startArr));
//       break;
//     case 1:
//       inProgressArr.splice(index, 1);
//       inProgressArr.forEach((arr) => {
//         arr[0] = inProgressArr.indexOf(arr);
//       });
//       localStorage.setItem("inProgressArr", JSON.stringify(inProgressArr));
//       break;
//     case 2:
//       inReviewArr.splice(index, 1);
//       inReviewArr.forEach((arr) => {
//         arr[0] = inReviewArr.indexOf(arr);
//       });
//       localStorage.setItem("inReviewArr", JSON.stringify(inReviewArr));
//       break;
//     case 3:
//       completeArr.splice(index, 1);
//       completeArr.forEach((arr) => {
//         arr[0] = completeArr.indexOf(arr);
//       });
//       localStorage.setItem("completeArr", JSON.stringify(completeArr));
//       break;
//     default:
//       try {
//         console.log(
//           "cannot be able to delete this card, please check on line 543;"
//         );
//       } catch (e) {
//         console.log(e);
//       }
//   }

//   updateCards();
// }

// // Add card to different columns based on category
// function addCard(arr, status) {
//   const card = document.createElement("div");
//   card.className = "card";
//   addCard.called = true;

//   if (status === "to-start") {
//     const cardDisplay = document.getElementById("startCol");
//     cardDisplay.appendChild(card);
//   } else if (status === "in-progress") {
//     const cardDisplay = document.getElementById("inProgressCol");
//     cardDisplay.appendChild(card);
//   } else if (status === "in-review") {
//     const cardDisplay = document.getElementById("inReviewCol");
//     cardDisplay.appendChild(card);
//   } else if (status === "complete") {
//     const cardDisplay = document.getElementById("completeCol");
//     cardDisplay.appendChild(card);
//   } else {
//     console.log("invalid status type detected");
//   }
//   card.innerHTML = `
//       <div class="card-header">
//         <p class="card-title">${arr[1]}</p>
//         <i class="fas fa-pen" data-bs-toggle="modal"
//           data-bs-target="#modal" onClick=resetBtnTrigger(${arr[0]},${arr[5]})></i>
//       </div>
//       <div class="card-description">
//         <p>${arr[2]}</p>
//       </div>
//       <div class="card-footer">
//         <p class="card-assigned">${arr[4]}</p>
//         <p class="due-date">${arr[3]}</p>
//       </div>
//   `;
// }

// // Clear form inputs once click the "create" button
// function clearInput() {
//   document.getElementById("taskName").value = "";
//   document.getElementById("description").value = "";
//   document.getElementById("dueDate").value = "";
//   document.getElementById("assignedPPL").value = "";
//   document.getElementById("status").value = "to-start";
// }
