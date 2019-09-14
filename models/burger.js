module.exports = function (sequelize, DataTypes) {
    let Burger = sequelize.define("Burger", {
        burger_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        consumed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });
    Burger.associate = function (models) {
        Burger.belongsTo(models.Customer, {
            foreignKey: {
                allowNull: true
            }
        });
    }
    return Burger;
};