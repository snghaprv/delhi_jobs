const express = require("express");
const JobSeeker = express.Router();
const { UserController } = require("../controllers");
const cb = (req, res) => {
  return;
};
JobSeeker.route("/edit-profile").post(cb);
JobSeeker.route("/profile").get(cb);

module.exports = JobSeeker;