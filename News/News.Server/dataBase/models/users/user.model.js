"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define("User", {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        fullName: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            maxLength: 250
        },
        userName: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            maxLength: 250
        },
        mobileNo: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            maxLength: 12,
            minLength: 10
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        activeCode: {
            type: sequelize_1.DataTypes.STRING,
            maxLength: 10,
            minLength: 5,
            allowNull: false,
        },
        isActive: {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: false,
        },
        registerDate: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
        },
    });
};
//# sourceMappingURL=user.model.js.map