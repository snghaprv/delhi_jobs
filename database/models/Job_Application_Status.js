module.exports = (sequelize, DataTypes) => {
  var Job_Application_Status = sequelize.define("Job_Application_Status", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    status: {
        type :DataTypes.ENUM("JS_CALLED", "R_CALLED","R_REJECTED")
    }
  },{freezeTableName: true});

  return Job_Application_Status;
};
