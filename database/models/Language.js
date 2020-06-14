module.exports = (sequelize, DataTypes) => {
    var Language = sequelize.define('Language', {
        id: {  type: DataTypes.INTEGER,
            primaryKey : true
        },
        label : DataTypes.STRING
    },{
        timestamps:false
    });
    return Language;
};