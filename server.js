// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/*Dependencies*/
const bodyParser = require("body-parser");

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("dist"));

// GET route
app.get("/all", (req, res) => {
  console.log("GET request received");
  res.send(projectData);
});

// POST route
app.post("/add", (req, res) => {
  projectData.date = req.body.date;
  projectData.temp = req.body.temp;
  projectData.feelings = req.body.feelings;
  console.log("Data: ", req["body"]);
  console.log({ projectData });
  return res.json({ projectData });
});

// Setup Server
const port = 8000;

//Spin up server
app.listen(port, listening);

//Callback of the function listening
function listening() {
  console.log("server running");
  console.log(`running on localhost: ${port}`);
}
