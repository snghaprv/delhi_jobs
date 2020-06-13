const {JobSeeker} = require('../services');
const {profile} = JobSeeker;

const getProfile = async function (req, res) {
  try {
    const jobseeker_id = req.token.id;
    const jobseeker = await profile.getProfile(jobseeker_id);
    return res.sendSuccessResponse(jobseeker);
  } catch (error) {
    console.error(error);
    return res.sendErrorResponse();
  }
};

const editProfile = async function (req, res) {
  
  try {
    const {body:edit_fields} = req;
    const jobseeker_id = req.token.id;
    await profile.editProfile(jobseeker_id,edit_fields);
    const jobseeker = await profile.getProfile(jobseeker_id);
    return res.sendSuccessResponse(jobseeker);
  } catch (error) {
    console.error(error);
    return res.sendErrorResponse();
  }
};

module.exports = {
  getProfile,
  editProfile
};
