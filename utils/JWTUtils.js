const jwt = require("jsonwebtoken");
const TYPE = {
  LOGIN: process.env.JWT_LOGIN_SECRET,
};
const issue = function (payload, expiresIn, key) {
  return jwt.sign(
    {
      payload,
    },
    key,
    { expiresIn }
  );
};

const verify = function (token, type) {
  const key = TYPE[type];
  return jwt.verify(token, key);
};

module.exports = {
  issue,
  verify,
  TYPE,
};
