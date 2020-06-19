const express = require("express");
const RecruiterRouter = express.Router();
const {RecruiterController} = require("../controllers");
const {isRecruiterAuthenticated} = require('../middleware')
const {createJob,editJob,editProfile,getProfile,getAllPostedJobs,getOneJob} = RecruiterController

cb = (req,res) => {
    res.sendSuccessResponse({message: "Implementation Pending..."})
}

RecruiterRouter.use('/',isRecruiterAuthenticated);
RecruiterRouter.route("/profile").patch(editProfile);
RecruiterRouter.route("/profile").get(getProfile);
RecruiterRouter.route("/jobs").post(createJob);
RecruiterRouter.route("/jobs").get(getAllPostedJobs);
RecruiterRouter.route("/jobs/:job_id").get(getOneJob);
RecruiterRouter.route("/jobs/:job_id").patch(editJob);
RecruiterRouter.route("/jobs/:job_id/applicants").get(cb);
RecruiterRouter.route("/jobs/:job_id/applicants/:applicant_id").post(cb);


module.exports = RecruiterRouter;