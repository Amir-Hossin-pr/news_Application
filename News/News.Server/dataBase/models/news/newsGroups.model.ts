import { DataTypes } from "sequelize";

module.exports = (sequelize) => {
  sequelize.define("NewsGroups", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
  });
};
