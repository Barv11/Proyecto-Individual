const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {

    // id: {
    //   type: DataTypes.UUID,
    //   defaultValue: DataTypes.UUIDV4,
    //   primaryKey: true,
    // },
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
  

    name: {
      type: DataTypes.STRING(20), // bulbasaur - eternatus
      allowNull: false,
      unique: true,
    },

    hp: {
      type: DataTypes.INTEGER, // 45 - 140
    },

    attack: {
      type: DataTypes.INTEGER, // 49 - 95
    },

    defense: {
      type: DataTypes.INTEGER, // 49 - 95
    },

    speed: {
      type: DataTypes.INTEGER, // 45 - 130
    },

    height: {
      type: DataTypes.INTEGER, // 7 - 200
    },

    weight: {
      type: DataTypes.INTEGER, // 68 - 9500
    },

    img: {
      type: DataTypes.STRING,
      defaultValue: 'https://pajarera.cl/wp-content/themes/claue/assets/images/placeholder.png'
    },
    
    created: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },

  }, {
    timestamps: false,
  });
};

