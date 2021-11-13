"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define("Role", {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
    });
};
//# sourceMappingURL=role.model.js.map