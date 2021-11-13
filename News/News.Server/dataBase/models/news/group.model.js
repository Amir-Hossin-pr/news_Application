"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define("Group", {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        title: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            maxLength: 250,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            maxLength: 250,
        },
    });
};
//# sourceMappingURL=group.model.js.map