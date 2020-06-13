const { sequelize, JobSeeker } = require("../database/models");
const { NOT_AUTHORIZED } = require("../constants/messages");
const JWTUtils = require("../utils/JWTUtils");
const { verify, TYPE } = JWTUtils;

module.exports = async (req, res, next) => {
  try {
    if (!req.headers || !req.headers.authorization) {
      console.error(`No Authorization header found`);
      return res.sendErrorResponse(NOT_AUTHORIZED, 403);
    }
    let tokenParam = req.headers.authorization;
    let verifiedToken = verify(tokenParam, TYPE.LOGIN);
    const jobseeker_id = verifiedToken.payload.jobseeker_id;
    let jobseeker = await JobSeeker.findOne({
      where: { id: jobseeker_id },
    });
  
    if (!jobseeker) {
      return res.sendErrorResponse(NOT_AUTHORIZED, 403);
    }
    req.token = jobseeker.dataValues;
    next();
  } catch (err) {
    console.error(err);
    return res.sendErrorResponse(NOT_AUTHORIZED, 403);
  }
};
