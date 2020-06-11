module.exports = (sequelize, DataTypes) => {
    var Category = sequelize.define('Category', {
        title : DataTypes.STRING,
        helptext : DataTypes.STRING,
        launch_only: {type :DataTypes.BOOLEAN, defaultValue: false},
        category_url : {type: DataTypes.STRING},
        is_active : {type :DataTypes.BOOLEAN, defaultValue: false},
        keywords :{type: DataTypes.TEXT,defaultValue: '[]'},
        average_salary : {type: DataTypes.INTEGER, allowNull: true},
        rank :  {type: DataTypes.INTEGER, allowNull: true},
        type: DataTypes.ENUM("BLUE_COLLAR", "GREY_COLLAR"),
        hi_title: DataTypes.STRING,
        en_title: DataTypes.STRING,
        hien_title: DataTypes.STRING
    });
    return Category;
};

