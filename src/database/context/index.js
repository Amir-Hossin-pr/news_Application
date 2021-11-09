const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("News_DB", "amir", "1G14ijWA", {
  host: "localhost",
  dialect: "mssql",
  benchmark: true,
});

sequelize.sync({ force: true });

module.exports = sequelize;
