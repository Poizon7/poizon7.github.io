let contact = document.querySelector(".unit");

fetch("contact.csv")
  .then((response) => response.blob())
  .then((data) => data.text())
  .then((text) => Contact(text));

function Contact(text) {
  const [data, headers] = csvToArrayContact(text);
  console.log(data);

  for (let i = 0; i < data.length; i++) {
    addElementContact(data[i], headers);
  }
}

function csvToArrayContact(str, delimiter = ",") {
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

function addElementContact(text, headers) {
  let day = text["GRUPP"].slice(text["GRUPP"].indexOf(" "));

  const divMain = document.createElement("div");
  divMain.setAttribute("class", day.toLowerCase());

  const title = document.createElement("h2");
  const titleText = document.createTextNode(day);

  title.appendChild(titleText);
  divMain.appendChild(title);

  const leader = document.createElement("p");
  const leaderText = document.createTextNode(text["LEDARE"]);

  leader.appendChild(leaderText);
  divMain.appendChild(leader);

  if ("" != text["TELE"]) {
    const num = document.createElement("p");
    const numText = document.createTextNode(text["TELE"]);

    num.appendChild(numText);
    divMain.appendChild(num);
  }

  if ("" != text["MAIL"]) {
    const mail = document.createElement("p");
    const mailText = document.createTextNode(text["MAIL"]);

    mail.appendChild(mailText);
    divMain.appendChild(mail);
  }

  const div = document
    .querySelector(
      "." + text["GRUPP"].slice(0, text["GRUPP"].indexOf(" ")).toLowerCase()
    )
    .querySelector(".text");

  div.appendChild(divMain);
}
