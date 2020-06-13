module.exports = (sequelize, DataTypes) => {
    var Qualification = sequelize.define('Qualification', {
        id: {  type: DataTypes.STRING,
            primaryKey : true
        },
        label : DataTypes.STRING
    },{
        timestamps:false
    });
    return Qualification;
};