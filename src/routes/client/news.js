const express = require("express");
const router = express.Router();
const { getClientNews } = require("../../service/news/news.service");

router.get("/:page/:count", async (req, res) => {
  let news = await getClientNews(req.params.page, req.params.count);
  res.json(news);
});

module.exports = router;
