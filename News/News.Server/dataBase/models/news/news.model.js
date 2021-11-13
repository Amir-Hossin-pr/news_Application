"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define("News", {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        title: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            maxLength: 500,
        },
        shortDescription: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            maxLength: 800,
        },
        text: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        isActive: {
            type: sequelize_1.DataTypes.BOOLEAN,
            allowNull: false,
        }
    });
};
//# sourceMappingURL=news.model.js.map