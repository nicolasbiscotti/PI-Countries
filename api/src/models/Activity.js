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
        type: DataTypes.INTEGER, // change to emun dataType
        allowNull: false,
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      season: {
        type: DataTypes.STRING, // change to emun dataType
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
