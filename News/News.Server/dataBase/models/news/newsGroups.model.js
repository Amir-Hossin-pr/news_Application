"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define("NewsGroups", {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
    });
};
//# sourceMappingURL=newsGroups.model.js.map