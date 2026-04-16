// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area=";

const input = document.getElementById("state-input");
const alertsDisplay = document.getElementById("alerts-display");
const errorMessage = document.getElementById("error-message");

function getWeatherAlerts(state) {
  fetch(weatherApi + state)
    .then(res => {
      if (!res.ok) {
        throw new Error("Error fetching weather alerts");
      }
      return res.json();
    })
    .then(data => {
      const alerts = data.features;

      // clear error
      errorMessage.classList.add("hidden");
      errorMessage.textContent = "";

      // display alerts
      alertsDisplay.innerHTML = `
        <h3>Weather Alerts: ${alerts.length}</h3>
      `;

      alerts.forEach(alert => {
        const p = document.createElement("p");
        p.textContent = alert.properties.headline;
        alertsDisplay.appendChild(p);
      });

      // clear input
      input.value = "";
    })
    .catch(error => {
      alertsDisplay.innerHTML = "";

      errorMessage.classList.remove("hidden");
      errorMessage.textContent = error.message;
    });
}

// event listener
const button = document.getElementById("get-alerts");

if (button) {
  button.addEventListener("click", function () {
    const state = input.value.trim().toUpperCase();

    if (!state) return;

    getWeatherAlerts(state);
  });
}