// Variables used in several functions
let attendanceButtons;
let attendanceBlocks;
let attendance = document.querySelector(".attendance");

// Fetching the data for the attendance function
fetch("attendance.csv")
  .then((response) => response.blob())
  .then((data) => data.text())
  .then((text) => Attendance(text));

// Main function for creation the attendance part
function Attendance(text) {
  const [data, headers] = csvToArrayAttendance(text);

  for (let i = 0; i < data.length; i++) {
    addElementAttendance(data[i], headers);
  }

  listnerAttendanceButton();
  listnerAttendanceEntry();
}

// Function for extracting data form the csv
function csvToArrayAttendance(str, delimiter = ",") {
  // Slice from start of text to the first \n index
  // Use split to create an array from string by delimiter
  const headers = str.slice(0, str.indexOf("\n")).split(delimiter);
  headers[headers.length - 1] = headers[headers.length - 1].substring(
    0,
    headers[headers.length - 1].length - 1
  );

  // Slice from \n index + 1 to the end of the text
  // Use split to create an array of each csv value row
  const rows = str.slice(str.indexOf("\n") + 1).split("\r\n");

  // Map the rows
  // Split values from each row into an array
  // Use headers.reduce to create an object
  // Object properties derived from headers:values
  // The object passed as an element of the array
  const arr = rows.map(function (row) {
    let values = [];
    let values2 = [];
    let index = row.indexOf(",");

    values2 = values.push(row.slice(0, index));

    for (let i = 0; i < headers.length; i++) {
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
        if (row.indexOf(",", index + 1) == -1) {
          values2 = values.push(row.slice(index + 1));
        } else {
          values2 = values.push(
            row.slice(index + 1, row.indexOf(",", index + 1))
          );
        }
      }
      index = row.indexOf(",", index + 1);
    }

    const el = headers.reduce(function (object, header, index) {
      object[header] = values[index];
      return object;
    }, {});
    return el;
  });

  // Return the array
  return [arr, headers];
}

// Function for adding the attendance part into html
function addElementAttendance(text, headers) {
  const divMain = document.createElement("div");
  divMain.setAttribute("class", "attendance-entry");

  const button = document.createElement("BUTTON");
  button.setAttribute("class", "attendance-entry-button");

  const week = document.createElement("h2");
  week.setAttribute("class", "attendance-week");

  const weekText = document.createTextNode(text["VECKA"]);

  const img = document.createElement("img");
  img.setAttribute("src", "img/arrow.png");
  img.setAttribute("alt", "arrow");

  week.appendChild(weekText);

  const divBlock = document.createElement("div");
  divBlock.setAttribute("class", "attendance-entry-block hidden");

  let num = 0;

  for (let i = 1; i < headers.length; i++) {
    const divEntry = document.createElement("div");
    divEntry.setAttribute("class", "attendance-entry-block-entry");

    const name = document.createElement("p");
    nameText = document.createTextNode(headers[i]);

    name.appendChild(nameText);
    divEntry.appendChild(name);

    const divMarker = document.createElement("div");

    if (text[headers[i]] == "*") {
      divMarker.setAttribute(
        "class",
        "attendance-entry-block-entry-marker present"
      );
      num++;
    } else {
      divMarker.setAttribute("class", "attendance-entry-block-entry-marker");
    }

    divEntry.appendChild(divMarker);
    divBlock.appendChild(divEntry);
  }

  const numPresent = document.createElement("h2");
  numPresent.setAttribute("class", "attendance-entry-button-present");

  let numPresentText;

  if (num === 0) {
    numPresentText = document.createTextNode("Närvaro ej genomförd");
  } else {
    numPresentText = document.createTextNode(
      num + " / " + (headers.length - 1)
    );
  }
  numPresent.appendChild(numPresentText);

  button.appendChild(week);
  button.appendChild(numPresent);
  button.appendChild(img);

  divMain.appendChild(button);
  divMain.appendChild(divBlock);
  attendance.appendChild(divMain);
}

// Functions for to set up eventlistner
function listnerAttendanceButton() {
  attendanceButtons = document.querySelectorAll(".attendance-entry-button");
  attendanceBlocks = document.querySelectorAll(".attendance-entry-block");

  for (let i = 0; i < attendanceButtons.length; i++) {
    attendanceButtons[i].addEventListener("click", viewAttendance);
  }
}

function listnerAttendanceEntry() {
  let attendanceEntry = document.querySelectorAll(
    ".attendance-entry-block-entry"
  );

  for (let i = 0; i < attendanceEntry.length; i++) {
    attendanceEntry[i].addEventListener("click", changeAttendance);
  }
}

// Function for hiding / showing calender entry block
function viewAttendance(e) {
  // Geting to the calender-entry-block no matter where you press
  let block = e.target;

  while (false === block.classList.contains("attendance-entry-button")) {
    block = block.parentNode;
  }

  block = block.parentNode;

  block = block.querySelector(".attendance-entry-block");

  // Changeing the curent block
  for (let i = 0; i < attendanceBlocks.length; i++) {
    if (
      false === block.isSameNode(attendanceBlocks[i]) &&
      false === attendanceBlocks[i].classList.contains("hidden")
    ) {
      attendanceBlocks[i].classList.add("hidden");
    }
  }

  block.classList.toggle("hidden");
}

// Function for changeing attendance
function changeAttendance(e) {
  let block = e.target;

  while (false === block.classList.contains("attendance-entry-block-entry")) {
    block = block.parentNode;
  }

  block = block.querySelector(".attendance-entry-block-entry-marker");
  block.classList.toggle("present");
}
