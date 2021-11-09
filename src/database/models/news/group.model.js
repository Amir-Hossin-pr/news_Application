const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Group", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      maxLength: 250,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      maxLength: 250,
    },
  });
};
