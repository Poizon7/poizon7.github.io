let attendanceButtons;
let attendanceBlocks;
let attendance = document.querySelector(".attendance");

// Function for to set up eventlistner
function listnerAttendance() {
  attendanceButtons = document.querySelectorAll(".attendance-entry-button");
  attendanceBlocks = document.querySelectorAll(".attendance-entry-block");

  console.log("listner");

  for (let i = 0; i < attendanceButtons.length; i++) {
    attendanceButtons[i].onclick = function (e) {
      viewAttendance(e);
    };
  }
  console.log(attendanceButtons);
}

//calendarButtons[i].addEventListener("click", view);

// function for hiding / showing calender entry block
function viewAttendance(e) {
  // Geting to the calender-entry-block no matter where you press
  let block = e.target;

  while (block.nodeName != "BUTTON") {
    block = block.parentNode;
  }

  block = block.parentNode;

  block = block.querySelector(".attendance-entry-block");

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
  for (let i = 0; i < attendanceBlocks.length; i++) {
    if (!block.isSameNode(attendanceBlocks[i])) {
      attendanceBlocks[i].style.display = "none";
    }
  }
}

fetch("attendance.csv")
  .then((response) => response.blob())
  .then((data) => data.text())
  .then((text) => Attendance(text));

function Attendance(text) {
  const [data, headers] = csvToArrayAttendance(text);

  console.log(data);
  console.log(headers);

  for (let i = 0; i < data.length; i++) {
    addElementAttendance(data[i], headers);
  }

  listnerAttendance();
}

function csvToArrayAttendance(str, delimiter = ",") {
  // slice from start of text to the first \n index
  // use split to create an array from string by delimiter
  const headers = str.slice(0, str.indexOf("\n")).split(delimiter);
  headers[headers.length - 1] = headers[headers.length - 1].substring(
    0,
    headers[headers.length - 1].length - 1
  );

  // slice from \n index + 1 to the end of the text
  // use split to create an array of each csv value row
  const rows = str.slice(str.indexOf("\n") + 1).split("\n");

  // Map the rows
  // split values from each row into an array
  // use headers.reduce to create an object
  // object properties derived from headers:values
  // the object passed as an element of the array
  const arr = rows.map(function (row) {
    let values = [];
    let values2 = [];
    let index = row.indexOf(",");

    values2 = values.push(row.slice(0, index));

    for (let i = 0; i < 4; i++) {
      if (row.includes('"')) {
        if (index < row.indexOf('"') - 1) {
          values2 = values.push(
            row.slice(index + 1, row.indexOf(",", index + 1))
          );
        } else {
          values2 = values.push(
            row.slice(index + 2, row.indexOf('"', index + 2))
          );
        }
      } else {
        values2 = values.push(
          row.slice(index + 1, row.indexOf(",", index + 1))
        );
      }
      index = row.indexOf(",", index + 1);
    }

    const el = headers.reduce(function (object, header, index) {
      object[header] = values[index];
      return object;
    }, {});
    return el;
  });

  // return the array
  return [arr, headers];
}

function addElementAttendance(text, headers) {
  const divMain = document.createElement("div");
  divMain.setAttribute("class", "attendance-entry");

  const button = document.createElement("BUTTON");
  button.setAttribute("class", "attendance-entry-button");

  const divText = document.createElement("div");
  divText.setAttribute("class", "attendance-entry-text");

  const week = document.createElement("h2");
  week.setAttribute("class", "attendance-week");

  const weekText = document.createTextNode(text["VECKA"]);

  const img = document.createElement("img");
  img.setAttribute("src", "img/arrow.png");
  img.setAttribute("alt", "arrow");

  week.appendChild(weekText);
  divText.appendChild(week);

  button.appendChild(divText);

  button.appendChild(img);

  divMain.appendChild(button);

  const divBlock = document.createElement("div");
  divBlock.setAttribute("class", "attendance-entry-block hidden");

  for (let i = 1; i < headers.length; i++) {
    const divEntry = document.createElement("div");
    divEntry.setAttribute("class", "attendance-entry-block-entry");

    const name = document.createElement("p");
    nameText = document.createTextNode(headers[i]);

    name.appendChild(nameText);
    divEntry.appendChild(name);
    divBlock.appendChild(divEntry);
  }

  divMain.appendChild(divBlock);
  /*
  const divDescription = document.createElement("div");
  divDescription.setAttribute("class", "calender-ideas");

  const descriptionTitle = document.createElement("h2");

  const descriptionTitleText = document.createTextNode("TANKAR, IDEER, M.M");

  const descriptionText = document.createElement("p");

  const descriptionTextText = document.createTextNode(text["BESKRIVNING"]);

  descriptionTitle.appendChild(descriptionTitleText);
  descriptionText.appendChild(descriptionTextText);
  divDescription.appendChild(descriptionTitle);
  divDescription.appendChild(descriptionText);
  divBlock.appendChild(divDescription);

  const divExtra = document.createElement("div");
  divExtra.setAttribute("class", "calender-extra");

  const divResponsible = document.createElement("div");
  divResponsible.setAttribute("class", "calender-responsible");

  const responsibleTitle = document.createElement("h2");

  const responsibleTitleText = document.createTextNode("ANSVARIG");

  const responsibleText = document.createElement("p");

  const responsibleTextText = document.createTextNode(text["ANSVARIG"]);

  responsibleTitle.appendChild(responsibleTitleText);
  responsibleText.appendChild(responsibleTextText);
  divResponsible.appendChild(responsibleTitle);
  divResponsible.appendChild(responsibleText);
  divExtra.appendChild(divResponsible);

  const divOther = document.createElement("div");
  divOther.setAttribute("class", "calender-other");

  const otherTitle = document.createElement("h2");

  const otherTitleText = document.createTextNode("ÖVRIGT");

  const otherText = document.createElement("p");

  const otherTextText = document.createTextNode(text["ÖVRIGT"]);

  otherTitle.appendChild(otherTitleText);
  otherText.appendChild(otherTextText);
  divOther.appendChild(otherTitle);
  divOther.appendChild(otherText);
  divExtra.appendChild(divOther);

  divBlock.appendChild(divExtra);

  divMain.appendChild(divBlock);
*/
  attendance.appendChild(divMain);
}
