const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "country",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      continent: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      flagURI: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      // timestamps: false
      timestamps: true,
      createdAt: false,
      updatedAt: "actualizado",
    }
  );
};
