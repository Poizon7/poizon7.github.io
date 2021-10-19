// Array with all the calender entry buttons on the page
//let calenderButtons = document.querySelectorAll(".calender-entry-button");
//let calenderBlocks = document.querySelectorAll(".calender-entry-block");

let calenderButtons;
let calenderBlocks;

//listner();

// Function for to set up eventlistner
function listnerCalender() {
  calenderButtons = document.querySelectorAll(".calender-entry-button");
  calenderBlocks = document.querySelectorAll(".calender-entry-block");

  for (let i = 0; i < calenderButtons.length; i++) {
    calenderButtons[i].onclick = function (e) {
      viewCalender(e);
    };
  }
}

//calendarButtons[i].addEventListener("click", view);

// function for hiding / showing calender entry block
function viewCalender(e) {
  // Geting to the calender-entry-block no matter where you press
  let block = e.target;

  while (block.nodeName != "BUTTON") {
    block = block.parentNode;
  }

  block = block.parentNode;

  block = block.querySelector(".calender-entry-block");

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
  for (let i = 0; i < calenderBlocks.length; i++) {
    if (!block.isSameNode(calenderBlocks[i])) {
      calenderBlocks[i].style.display = "none";
    }
  }
}

const calender = document.querySelector(".calender");

fetch("calender.csv")
  .then((response) => response.blob())
  .then((data) => data.text())
  .then((text) => Calender(text));

function Calender(text) {
  const data = csvToArray(text);

  for (let i = 0; i < data.length; i++) {
    addElementCalender(data[i]);
  }

  listnerCalender();
}

function csvToArray(str, delimiter = ",") {
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
  return arr;
}

function addElementCalender(text) {
  const divMain = document.createElement("div");
  divMain.setAttribute("class", "calender-entry");

  const button = document.createElement("BUTTON");
  button.setAttribute("class", "calender-entry-button");

  const divText = document.createElement("div");
  divText.setAttribute("class", "calender-entry-text");

  const week = document.createElement("h2");
  week.setAttribute("class", "calender-week");

  const weekText = document.createTextNode(text["VECKA"]);

  const title = document.createElement("h2");
  title.setAttribute("class", "calender-title");

  const titleText = document.createTextNode(text["MÖTE"]);

  const img = document.createElement("img");
  img.setAttribute("src", "img/arrow.png");
  img.setAttribute("alt", "arrow");

  week.appendChild(weekText);
  divText.appendChild(week);

  title.appendChild(titleText);
  divText.appendChild(title);
  button.appendChild(divText);

  button.appendChild(img);

  divMain.appendChild(button);

  const divBlock = document.createElement("div");
  divBlock.setAttribute("class", "calender-entry-block hidden");

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

  calender.appendChild(divMain);
}
