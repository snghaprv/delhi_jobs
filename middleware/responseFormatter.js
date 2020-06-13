const {GENERIC_ERROR} = require('../constants/messages')

module.exports = (req, res, next) => { 
  res.sendSuccessResponse = function (data) {
    return res.status(200).send({
      status: "success",
      data: data || {},
    });
  }

  res.sendErrorResponse = function (message=GENERIC_ERROR,code=400) {
    return res.status(code).send({
      status: 'error',
      message : message
    });
  }
  next();
}