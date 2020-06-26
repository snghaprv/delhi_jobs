const express = require("express");
const RecruiterRouter = express.Router();
const {RecruiterController} = require("../controllers");
const {isRecruiterAuthenticated,isRecruiterAuthenticatedForJob,} = require('../middleware')
const {createJob,editJob,editProfile,getProfile,getAllPostedJobs,getOneJob,getApplicationsForAJob,changeApplicationStatus} = RecruiterController


RecruiterRouter.use('/',isRecruiterAuthenticated);
RecruiterRouter.route("/profile").patch(editProfile);
RecruiterRouter.route("/profile").get(getProfile);
RecruiterRouter.route("/jobs").post(createJob);
RecruiterRouter.route("/jobs").get(getAllPostedJobs);

RecruiterRouter.use("/jobs/:job_id",isRecruiterAuthenticatedForJob);
RecruiterRouter.route("/jobs/:job_id").get(getOneJob);
RecruiterRouter.route("/jobs/:job_id").patch(editJob);



RecruiterRouter.route("/jobs/:job_id/applicants").get(getApplicationsForAJob);
RecruiterRouter.route("/jobs/:job_id/applicants/:applicant_id").post(changeApplicationStatus);

module.exports = RecruiterRouter;