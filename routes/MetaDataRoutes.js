const express = require("express");
const MetaDataRouter = express.Router();
const { MetaDataController } = require("../controllers");
const {getJobSeekerRegistrationMetaData,getJobPostFormMetaData,getCountForTicker} = MetaDataController
MetaDataRouter.route('/registration/job-seeker').get(getJobSeekerRegistrationMetaData);
MetaDataRouter.route('/job-post-fields').get(getJobPostFormMetaData);
MetaDataRouter.route('/employer-vacancy-seeker-count').get(getCountForTicker);

module.exports =MetaDataRouter;