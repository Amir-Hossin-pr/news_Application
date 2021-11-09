const { models } = require("../../database/context/index");
const { pagination } = require("../pagination");

async function getClientNews(page, count) {
  try {
    let news = await models.News.findAll({ where: { isActive: true } });
    return pagination(page, count, news);
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = { getClientNews };
