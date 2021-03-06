"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const news_service_1 = require("../../services/news/news.service");
const newsServices = new news_service_1.NewsServices();
router.get("/:page/:count", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let news = yield newsServices.getClientNews({
        page: parseInt(req.params.page),
        count: parseInt(req.params.count)
    });
    res.json(news);
    res.end();
}));
router.get("/search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let query = req.query;
    let news = yield newsServices.search(query.q, {
        page: parseInt(query.page),
        count: parseInt(query.count)
    });
    res.json(news);
    res.end();
}));
router.get("/getNewsItem", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let query = req.query;
    let newsItem = yield newsServices.getNewsItem(parseInt(query.id));
    res.json(newsItem);
    res.end();
}));
exports.default = router;
//# sourceMappingURL=news.js.map