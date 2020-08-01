module.exports = (sequelize, DataTypes) => {
    var Job_Application_Status = sequelize.define("Job_Application_Status", {
      js_last_action : {
        type :DataTypes.ENUM("JS_CALLED", "JS_WHATSAPP","JS_APPLIED")
      },
      r_last_action : {
        type :DataTypes.ENUM("R_CALLED","R_REJECTED")
      }
    },{freezeTableName: true});
    return Job_Application_Status;
  };