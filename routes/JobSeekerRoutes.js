const express = require("express");
const JobSeekerRouter = express.Router();
const { JobSeekerController } = require("../controllers");
const { isJobSeekerAuthenticated } = require("../middleware");
const {
  getProfile,
  editProfile,
  deleteProfile,
  getOneJob,
  getAllJobs,
  getAppliedJobs,
  ApplyForAJob
} = JobSeekerController;

JobSeekerRouter.use("/", isJobSeekerAuthenticated);
JobSeekerRouter.route("/edit-profile").post(editProfile);
JobSeekerRouter.route("/profile").get(getProfile);
JobSeekerRouter.route("/profile").delete(deleteProfile);
JobSeekerRouter.route("/jobs/:job_id").get(getOneJob);
JobSeekerRouter.route("/jobs/:job_id/application").post(ApplyForAJob);
JobSeekerRouter.route("/jobs").post(getAllJobs);
JobSeekerRouter.route("/applications").get(getAppliedJobs);

module.exports = JobSeekerRouter;
