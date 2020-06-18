const express = require("express");
const RecruiterRouter = express.Router();
const {RecruiterController} = require("../controllers");
const {isRecruiterAuthenticated} = require('../middleware')
const {createJob,editJob,editProfile,getProfile} = RecruiterController

cb = (req,res) => {
    res.sendSuccessResponse({message: "Implementation Pending..."})
}

RecruiterRouter.use('/',isRecruiterAuthenticated);
RecruiterRouter.route("/edit-profile").post(editProfile);
RecruiterRouter.route("/profile").get(getProfile);
RecruiterRouter.route("/job").post(createJob);
RecruiterRouter.route("/jobs").get(cb);
RecruiterRouter.route("/jobs/:job_id").get(cb);
RecruiterRouter.route("/jobs/:job_id").patch(editJob);

module.exports = RecruiterRouter;