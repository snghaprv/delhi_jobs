module.exports = (sequelize, DataTypes) => {
  var Skill = sequelize.define(
    "Skill",
    {
      id: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
      },
      label: { type: DataTypes.STRING, allowNull: true },
    },
    {
      timestamps: false,
    }
  );
  Skill.associate = function (models) {
    models.Skill.belongsToMany(models.Category, {
      through: "Category_Skills",
      foreignKey: "skill_id",
      sourceKey: "id",
    });
    models.Skill.belongsToMany(models.Job, {
      through: "Job_Skills",
      foreignKey: "skill_id",
      sourceKey: "id",
    });
  };
  return Skill;
};
