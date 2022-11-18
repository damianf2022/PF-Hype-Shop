const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "cart",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      cart_total: {
        type: DataTypes.DECIMAL(14, 2),
        defaultValue: 0,
      },
    },
    { timestamps: false }
  );
};
