module.exports = function (sequelize, DataTypes) {
    let Customer = sequelize.define("Customer", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return Customer;
};