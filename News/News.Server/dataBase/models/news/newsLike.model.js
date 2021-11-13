"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequlize) => {
    sequlize.define("NewsLike", {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            autoIncrementIdentity: true,
            primaryKey: true
        }
    });
};
//# sourceMappingURL=newsLike.model.js.map