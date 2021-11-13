import { Sequelize } from 'sequelize'
import { applyExtraSetup } from './extraSetup'

const sequlize = new Sequelize("News_DB", "amir", "1G14ijWA", {
    host: "localhost",
    dialect: "mssql",
    benchmark: true
})

const modelDefines = [];

for (const modelDefine of modelDefines) {
    modelDefine(sequlize)
}

applyExtraSetup(sequlize);

module.exports = sequlize;