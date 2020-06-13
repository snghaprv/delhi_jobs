const express = require("express");
const MetaDataRouter = express.Router();
const { MetaDataController } = require("../controllers");
const {getJobSeekerRegistrationMetaData} = MetaDataController
MetaDataRouter.route('/registration/job-seeker').get(getJobSeekerRegistrationMetaData)

module.exports =MetaDataRouter