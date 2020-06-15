const express = require("express");
const RecruiterRouter = express.Router();
const {RecruiterController} = require("../controllers");
const {isRecruiterAuthenticated} = require('../middleware')

cb = (req,res) => {
    res.sendSuccessResponse({message: "Implementation Pending..."})
}

RecruiterRouter.use('/',isRecruiterAuthenticated);
RecruiterRouter.route("/edit-profile").post(cb);
RecruiterRouter.route("/profile").get(cb);

module.exports = RecruiterRouter;