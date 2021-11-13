import { DataTypes, Sequelize } from "sequelize";

module.exports = (sequlize: Sequelize) => {
    sequlize.define("NewsLike", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
    });
}