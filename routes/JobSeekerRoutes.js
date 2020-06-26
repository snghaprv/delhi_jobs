const express = require("express");
const JobSeekerRouter = express.Router();
const { JobSeekerController } = require("../controllers");
const { isJobSeekerAuthenticated } = require("../middleware");
const {
  getProfile,
  editProfile,
  getOneJob,
  getAllJobs,
  getAppliedJobs,
  applyForAJob
} = JobSeekerController;

JobSeekerRouter.use("/", isJobSeekerAuthenticated);
JobSeekerRouter.route("/profile").patch(editProfile);
JobSeekerRouter.route("/edit-profile").post(editProfile); //TODO: TO REMOVE
JobSeekerRouter.route("/profile").get(getProfile);
JobSeekerRouter.route("/jobs/:job_id").get(getOneJob);
JobSeekerRouter.route("/jobs/:job_id/application").post(applyForAJob);
JobSeekerRouter.route("/jobs").post(getAllJobs);
JobSeekerRouter.route("/applications").get(getAppliedJobs);

module.exports = JobSeekerRouter;
