const { Sequelize } = require("sequelize");
const { applyExtraSetup } = require("./extraSetup");

const sequelize = new Sequelize("News_DB", "amir", "1G14ijWA", {
  host: "localhost",
  dialect: "mssql",
  benchmark: true,
});

const modelDefiners = [
  require("../models/news/news.model"),
  require("../models/news/keys.model"),
  require("../models/news/newsGroups.model"),
  require("../models/news/group.model"),
  require("../models/users/role.model"),
  require("../models/users/session.model"),
  require("../models/users/user.model"),
];

for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

applyExtraSetup(sequelize);

sequelize.sync({ force: true });

module.exports = sequelize;
