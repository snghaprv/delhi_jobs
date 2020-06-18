const { Job } = require("../database/models");
const { NOT_AUTHORIZED } = require("../constants/messages");
const JWTUtils = require("../utils/JWTUtils");
const { verify, TYPE } = JWTUtils;

module.exports = async (req, res, next) => {
  try {
    const recruiter_id = req.token.id;
    const {job_id} = req.body
    const job_data = await Job.findOne({where:{
        job_id,
        recruiter_id
    }})
    if(!job_data){
        return res.sendErrorResponse(NOT_AUTHORIZED, 403);
    }
    next();
  } catch (err) {
    console.error(err);
    return res.sendErrorResponse(NOT_AUTHORIZED, 403);
  }
};
