const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "type",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUID,
        primaryKey: true,
      },
    },
    {
      timestamps: false,
      cretedAt: false,
    }
  );
};
