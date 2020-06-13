const express = require("express");
const JobSeekerRouter = express.Router();
const { JobSeekerController } = require("../controllers");
const {isJobSeekerAuthenticated} = require('../middleware')
const {getProfile,editProfile} = JobSeekerController;


JobSeekerRouter.use('/',isJobSeekerAuthenticated);
JobSeekerRouter.route("/edit-profile").post(editProfile);
JobSeekerRouter.route("/profile").get(getProfile);

module.exports = JobSeekerRouter;