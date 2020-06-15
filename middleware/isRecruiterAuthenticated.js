const { Recruiter } = require("../database/models");
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
    const recruiter_id = verifiedToken.payload.recruiter_id;
    let recruiter = await Recruiter.findOne({
      where: { id: recruiter_id },
    });
  
    if (!recruiter) {
      return res.sendErrorResponse(NOT_AUTHORIZED, 403);
    }
    req.token = recruiter.dataValues;
    next();
  } catch (err) {
    console.error(err);
    return res.sendErrorResponse(NOT_AUTHORIZED, 403);
  }
};

