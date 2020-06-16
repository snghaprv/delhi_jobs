const express = require("express");
const MetaDataRouter = express.Router();
const { MetaDataController } = require("../controllers");
const {getJobSeekerRegistrationMetaData,getJobPostFormMetaData} = MetaDataController
MetaDataRouter.route('/registration/job-seeker').get(getJobSeekerRegistrationMetaData);
MetaDataRouter.route('/job-post-fields').get(getJobPostFormMetaData);

module.exports =MetaDataRouter;