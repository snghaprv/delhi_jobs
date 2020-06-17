const express = require("express");
const JobSeekerRouter = express.Router();
const { JobSeekerController } = require("../controllers");
const {isJobSeekerAuthenticated} = require('../middleware')
const {getProfile,editProfile,deleteProfile,getOneJob,getAllJobs} = JobSeekerController;


JobSeekerRouter.use('/',isJobSeekerAuthenticated);
JobSeekerRouter.route("/edit-profile").post(editProfile);
JobSeekerRouter.route("/profile").get(getProfile);
JobSeekerRouter.route("/profile").delete(deleteProfile);
JobSeekerRouter.route("/jobs/:job_id").get(getOneJob);
JobSeekerRouter.route("/jobs").get(getAllJobs);
JobSeekerRouter.route("/applications").get(()=>{});

module.exports = JobSeekerRouter;