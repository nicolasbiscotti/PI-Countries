const { DataTypes } = require("sequelize");
// Exportamos una funcion, al ejecutarla definimos el modelo Activity
module.exports = (sequelize) => {
  sequelize.define(
    "activity",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      difficulty: {
        type: DataTypes.ENUM("1", "2", "3", "4", "5"),
        allowNull: false,
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      season: {
        type: DataTypes.ENUM("Winter", "Spring", "Summer", "Autumn"),
        allowNull: false,
      },
    },
    {
      timestamps: true,
      createdAt: false,
      updatedAt: "actualizado",
    }
  );
};
