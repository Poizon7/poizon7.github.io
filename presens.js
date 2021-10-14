let presensButtons;
let presensBlocks;

// Function for to set up eventlistner
function listner() {
  presensButtons = document.querySelectorAll(".presens-button");
  presensBlocks = document.querySelectorAll(".presens-block");

  console.log("listner");

  for (let i = 0; i < presensButtons.length; i++) {
    presensButtons[i].onclick = function (e) {
      view(e);
    };
  }
  console.log(presensButtons);
}

//calendarButtons[i].addEventListener("click", view);

// function for hiding / showing calender entry block
function view(e) {
  // Geting to the calender-entry-block no matter where you press
  let block = e.target;

  console.log("test");

  console.log(block);

  while (block.nodeName != "BUTTON") {
    block = block.parentNode;
  }

  console.log(block);

  block = block.parentNode;

  console.log(block);

  block = block.querySelector(".presens-block");

  console.log(block);

  // Changeing the curent block

  // block.classList.add("hidden");
  // block.classList.remove("hidden");
  // block.classList.toggle("hidden");

  if (block.style.display === "none") {
    block.style.display = "flex";
  } else {
    block.style.display = "none";
  }

  // Hiding all other blocks
  for (let i = 0; i < presensBlocks.length; i++) {
    if (!block.isSameNode(presensBlocks[i])) {
      presensBlocks[i].style.display = "none";
    }
  }
}

fetch("attendence.txt")
  .then((response) => response.blob())
  .then((data) => data.text())
  .then((text) => Attendence(text))
  .then(listner());

function Attendence(text) {
  const data = txtToArray(text);

  listner();

  console.log("textToArray");

  for (let i = 0; i < data.length; i++) {
    addElementAttendance(data[i]);
  }
}

function txtToArray(str) {
  const arr = str.split("\r\n");
  return arr;
}

function addElementAttendance() {}
