"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const extraSetup_1 = require("./extraSetup");
const sequlize = new sequelize_1.Sequelize("News_DB", "amir", "1G14ijWA", {
    host: "localhost",
    dialect: "mssql",
    benchmark: true
});
const modelDefines = [
    require("../models/news/group.model"),
    require("../models/news/keys.model"),
    require("../models/news/news.model"),
    require("../models/news/newsGroups.model"),
    require("../models/news/newsLike.model"),
    require("../models/users/role.model"),
    require("../models/users/session.model"),
    require("../models/users/user.model"),
];
for (const modelDefine of modelDefines) {
    modelDefine(sequlize);
}
(0, extraSetup_1.default)(sequlize);
//sequlize.sync({ force: true })
exports.default = sequlize;
//# sourceMappingURL=index.js.map