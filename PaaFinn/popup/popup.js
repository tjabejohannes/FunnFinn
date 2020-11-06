function getCurrentDestination() {
  const currentDestination = localStorage.getItem("destination");
  browser.storage.local.get("destination").then((data) => {
    document.getElementById("destination-input").value = data.destination;

  });
}

function listenForClicks() {
  document.getElementById("SetButton").addEventListener("click", () => {
    setDestination();
  });
}

function setDestination() {
  const destination = document.getElementById("destination-input").value;
  browser.storage.local.set({"destination": destination});
  showSuccessAlert("New destination saved!");
}

function showSuccessAlert(alertMessege) {
  const alert = document.getElementById("Success-alert");
  alert.textContent = alertMessege;
  alert.hidden = false;
  setTimeout(function () {
    alert.hidden = true;
  }, 1500);
}

getCurrentDestination();
listenForClicks();

console.log("Popup script loaded!");
