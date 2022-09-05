const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    idPoke: {
      type: DataTypes.INTEGER,
    },
    health: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    attack: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    defense: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    attackEsp:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    defenseEsp: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    speed: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    heigth: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    img: {
      type: DataTypes.STRING,
    }
  }, {
    timestamps: false
  });
};
