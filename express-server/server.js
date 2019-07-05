//node packages
const express = require("express");
require("dotenv").config(); //needed for cors, will remove in production
const cors = require("cors");
const bodyParser = require("body-parser");

//local packages

//node package config
const app = express();
const router = express.Router();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
let corsOptions = {
  // Because angular is hosted on a separate server, angular will be hosted together on production run
  origin: "http://localhost:4200",
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use("/", router);

//local package config

//globals
const PORT = 3000;

//API ENDPOINT FILES
require("./api/user.js")(router);
require("./api/checklist.js")(router);
require("./api/trainer.js")(router);
require("./api/role.js")(router);

app.get("/", (req, res) => res.send("Hello World123!"));

app.listen(PORT, "0.0.0.0", () =>
  console.log(`Training app listening on port ${PORT}!`)
);
