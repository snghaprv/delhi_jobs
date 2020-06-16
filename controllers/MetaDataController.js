
const { MetaDataServices } = require("../services");


const getJobSeekerRegistrationMetaData = async function (req, res) {
  try {
    const metadata = await MetaDataServices.getJobSeekerRegistrationMetaData()
    return res.sendSuccessResponse(metadata);
  } catch (error) {
    console.error(error);
    return res.sendErrorResponse();
  }
};

const getJobPostFormMetaData = async function (req, res) {
  try {
    const job_post_form = await MetaDataServices.getJobPostForMetaData();
    return res.sendSuccessResponse({job_post_form});
  } catch (error) {
    console.error(error);
    return res.sendErrorResponse();
  }
};
module.exports = {
  getJobSeekerRegistrationMetaData,
  getJobPostFormMetaData
};
