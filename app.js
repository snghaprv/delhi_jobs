require("dotenv").config();
//const {GENERIC_ERROR} = require("./constants/ErrorMessageConstants");
const express = require("express");

const bodyParser = require("body-parser");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const rfs = require("rotating-file-stream");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = process.env.PORT || 3000;
const db = require("./database/models");
const {AuthRoutes,JobSeekerRoutes} = require('./routes')
const responseFormatter = require('./middleware/responseFormatter');
// const accessLogStream = rfs('access.log', {
//     interval: '1d', // rotate daily
//     path: path.join(__dirname, 'access_log')
//   })
// app.use(morgan('combined', {stream :accessLogStream }));
app.use(responseFormatter);
app.get("/", (req, res) => {
    res.json({message: `Delhi Government is here is Help You ..!!`});
  });
app.use("/login", AuthRoutes);
app.use("/jobseeker",JobSeekerRoutes );
//app.use("/recruiter",RecruiterRoutes );

app.get("*", (req, res) => {
  res.status(404).json({ error: `Couldn't find the route.` });
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(400).json({ error: `Something Bad Happened.` });
});

// app.listen(port, () => {
//   console.log(`Running on ${port}`);
// });

db.sequelize.sync({force: true}).then(() => {
  app.listen(port, () => {
    console.log(`Running on ${port}`);
  });
});