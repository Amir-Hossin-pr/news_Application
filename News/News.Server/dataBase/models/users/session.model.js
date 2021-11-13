"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define("Session", {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        key: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        value: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        expireDate: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
        },
    });
};
//# sourceMappingURL=session.model.js.map