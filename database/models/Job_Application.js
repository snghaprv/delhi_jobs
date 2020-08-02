module.exports = (sequelize, DataTypes) => {
    var Job_Application = sequelize.define("Job_Application", {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      status: {
          type :DataTypes.ENUM("JS_VIEWED", "JS_CALLED", "R_CALLED","R_REJECTED","JS_WHATSAPP","JS_APPLIED")
      },
    }, );
    Job_Application.associate = function (models) {
      models.Job_Application.belongsTo(models.JobSeeker, {
        foreignKey: "js_id",
        sourceKey: "id"
      });
      models.Job_Application.belongsTo(models.Job, {
        foreignKey: "job_id",
        sourceKey: "id"
      });
    };
    return Job_Application;
  };
  