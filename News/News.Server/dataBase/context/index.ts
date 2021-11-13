import { Sequelize } from 'sequelize'
import { applyExtraSetup } from './extraSetup'

const sequlize = new Sequelize("News_DB", "amir", "1G14ijWA", {
    host: "localhost",
    dialect: "mssql",
    benchmark: true
})

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
    modelDefine(sequlize)
}

applyExtraSetup(sequlize);

export default sequlize;