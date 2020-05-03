/* Global Variables */
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=3fba049ab2c0518fc9296b2d75fae5f6";
const baseUrl = "http://127.0.0.1:8000";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click", performAction);

/* Function called by event listener */
function performAction(e) {
  e.preventDefault();
  // get user input values
  const zipCode = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;

  getWeather(apiUrl, zipCode, apiKey).then(function (userData) {
    // add data to POST request
    postData(`${baseUrl}/add`, {
      date: newDate,
      temp: userData.main.temp,
      feelings,
    }).then(function () {
      // Function to update the UI
      updateUI();
    });
  });
}

/* Function to GET API Data*/
const getWeather = async (apiUrl, zipCode, apiKey) => {
  const res = await fetch(apiUrl + zipCode + apiKey);
  try {
    const userData = await res.json();
    return userData;
  } catch (error) {
    console.log("error", error);
  }
};

/* Function to POST data */
const postData = async (url = "", data = {}) => {
  const req = await fetch(url, {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify({
      date: data.date,
      temp: data.temp,
      feelings: data.feelings,
    }),
  });

  try {
    const newData = await req.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

// Update user interface
const updateUI = async () => {
  const request = await fetch(`${baseUrl}/all`);
  try {
    const allData = await request.json();
    document.getElementById("date").innerHTML = allData.date;
    document.getElementById("temp").innerHTML = allData.temp;
    document.getElementById("content").innerHTML = allData.feelings;
  } catch (error) {
    console.log("error", error);
  }
};
