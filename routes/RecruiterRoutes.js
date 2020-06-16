const express = require("express");
const RecruiterRouter = express.Router();
const {RecruiterController} = require("../controllers");
const {isRecruiterAuthenticated} = require('../middleware')
const {createJob,editJob} = RecruiterController

cb = (req,res) => {
    res.sendSuccessResponse({message: "Implementation Pending..."})
}

RecruiterRouter.use('/',isRecruiterAuthenticated);
RecruiterRouter.route("/edit-profile").post(cb);
RecruiterRouter.route("/profile").get(cb);
RecruiterRouter.route("/job").post(createJob);
RecruiterRouter.route("/jobs").get(cb);
RecruiterRouter.route("/jobs/:job_id").get(cb);
RecruiterRouter.route("/jobs/:job_id").patch(editJob);

module.exports = RecruiterRouter;