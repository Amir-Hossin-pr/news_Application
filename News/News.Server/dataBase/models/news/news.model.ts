import { DataTypes } from "sequelize";

module.exports = (sequelize) => {
  sequelize.define("News", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      maxLength: 500,
    },
    shortDescription: {
      type: DataTypes.STRING,
      allowNull: false,
      maxLength: 800,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActive:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  });
};
