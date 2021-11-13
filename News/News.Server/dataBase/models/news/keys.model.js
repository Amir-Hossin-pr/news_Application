"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define("Keys", {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        text: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            maxLength: 100,
        },
    });
};
//# sourceMappingURL=keys.model.js.map