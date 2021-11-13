import { DataTypes } from "sequelize";
import { DataType } from "sequelize-typescript";

module.exports = (sequelize) => {
    sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: false,
            maxLength: 250
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            maxLength: 250
        },
        mobileNo: {
            type: DataTypes.STRING,
            allowNull: false,
            maxLength: 12,
            minLength: 10
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        activeCode: {
            type: DataTypes.STRING,
            maxLength: 10,
            minLength: 5,
            allowNull: false,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        image: {
            type: DataType.STRING,
            allowNull: true
        },
        registerDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    });
};
