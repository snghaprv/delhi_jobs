const express = require("express");
const JobSeekerRouter = express.Router();
const { JobSeekerController } = require("../controllers");
const {isJobSeekerAuthenticated} = require('../middleware')
const cb = (req, res) => {
  return;
};
const {getProfile} = JobSeekerController
JobSeekerRouter.use('/',isJobSeekerAuthenticated);
JobSeekerRouter.route("/edit-profile").post(cb);
JobSeekerRouter.route("/profile").get(getProfile);

module.exports = JobSeekerRouter;