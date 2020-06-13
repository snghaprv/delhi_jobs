module.exports = (sequelize, DataTypes) => {
    var Qualification = sequelize.define('Qualification', {
        id: {  type: DataTypes.INTEGER,
            primaryKey : true
        },
        label : DataTypes.STRING
    },{
        timestamps:false
    });
    return Qualification;
};