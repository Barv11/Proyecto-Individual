const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('type', {
    name: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
    },
  },{
    timestamps: false,
  });
};
