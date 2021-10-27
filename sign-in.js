function storageAvailable(type) {
  var storage;
  try {
    storage = window[type];
    var x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

if (storageAvailable("localStorage")) {
  console.log("Yippee! We can use localStorage awesomeness");
} else {
  console.log("Too bad, no localStorage for us");
}

let passwordField = document.querySelector("#password");
let usernameField = document.querySelector("#username");

/*function login(e) {
  e.preventDefault();

  let password = passwordField.value;

  if (localStorage.getItem("password") != null) {
    console.log(localStorage.getItem("password"));
    if (localStorage.getItem("password") == password) {
      console.log("Login sucsesful");
      window.open("./scout.html", "_self");
    } else {
      console.log("Login failed");
    }
  } else {
    localStorage.setItem("password", password);
    console.log("Password set");
  }
}*/

function login(e) {
  e.preventDefault();

  switch (usernameField.value) {
    case "scout":
      if (passwordField.value == usernameField.value) {
        window.open("./scout.html", "_self");
      }
      break;
    case "ledare":
      if (passwordField.value == usernameField.value) {
        window.open("./ledare.html", "_self");
      }
      break;
    case "vård":
      if (passwordField.value == usernameField.value) {
        window.open("./gardian.html", "_self");
      }
      break;
    default:
      console.log("Incorrect username or password");
      break;
  }
}

document.querySelector("form").addEventListener("submit", login);
