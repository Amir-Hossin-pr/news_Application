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

async function createNews(news) {
  try {
    await models.News.create(news);
    return true;
  } catch {
    return false;
  }
}

async function deleteNews(id) {
  try {
    await models.News.drop(id);
    return true;
  } catch {
    return false;
  }
}

module.exports = { getClientNews, createNews, deleteNews };
