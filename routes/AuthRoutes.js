const express = require("express");
const AuthRouter = express.Router();
const { AuthController } = require("../controllers");

const {
  sendOTPToJobSeeker,
  verifyOTPForJobSeeker,
  sendOTPToRecruiter,
  verifyOTPForRecruiter,
} = AuthController;


AuthRouter.route("/job-seeker/send-otp").post(sendOTPToJobSeeker);
AuthRouter.route("/job-seeker/verify-otp").post(verifyOTPForJobSeeker);
AuthRouter.route("/recruiter/send-otp").post(sendOTPToRecruiter);
AuthRouter.route("/recruiter/verify-otp").post(verifyOTPForRecruiter);

module.exports = AuthRouter;
