const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Keys", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
      maxLength: 100,
    },
  });
};
