const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 2020;

//routes
const newsApi = require("./routes/client/news");
const accountApi = require("./routes/client/account");
const newsAdminApi = require("./routes/admin/news");
const usersAdminApi = require("./routes/admin/users");

app.use("/api/news", newsApi);
app.use("/api/account", accountApi);
app.use("/api/admin/news", newsAdminApi);
app.use("/api/admin/users", usersAdminApi);

//application configs
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//data base
const sequelize = require("./database/context/index");

//functions
async function assertDataBaseConnectionOk() {
  console.log("Checking Data Base Connection ...");
  try {
    await sequelize.authenticate();
    console.log("Data Base Connected Successfully");
  } catch (err) {
    console.log("Unable to connect to Data Base");
    console.log(err.message);
    process.exit(1);
  }
}

async function init() {
  await assertDataBaseConnectionOk();

  console.log(`Starting Sequelize + Express on port ${port}...`);
  app.listen(port, () => {
    console.log(`Web Server Start On http://localhost:${port}`);
  });
}

init();
