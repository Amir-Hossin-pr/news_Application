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
const index_1 = require("../../consts/index");
const account_service_1 = require("../../services/user/account.service");
const news_service_1 = require("../../services/news/news.service");
const accountServices = new account_service_1.AccountService();
const newsServices = new news_service_1.NewsServices();
router.use((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield accountServices.getUser(req.headers);
    if (user != null) {
        if (user.RoleId == 1) {
            next();
        }
        else {
            res.json(index_1.messages.accessDenied("You do not have access to this"));
            res.end();
        }
    }
    else {
        res.json(index_1.messages.accessDenied("You do not have access to this"));
        res.end();
    }
}));
router.get("/:page/:count", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let news = yield newsServices.getAdminNews({
        page: parseInt(req.params.page),
        count: parseInt(req.params.count)
    });
    res.json(news);
    res.end();
}));
router.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let body = req.body;
    let creaeted = yield newsServices.createNews({
        title: body.title,
        isActive: body.isActive,
        shortDescription: body.shortDescription,
        text: body.text,
        base64: body.base64
    });
    res.json(creaeted);
    res.end();
}));
router.post("/update", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let body = req.body;
    let updated = yield newsServices.updateNews({
        id: body.id,
        title: body.title,
        isActive: body.isActive,
        shortDescription: body.shortDescription,
        text: body.text,
        base64: body.base64
    });
    res.json(updated);
    res.end();
}));
router.post("/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let delNews = yield newsServices.deleteNews(req.body.id);
    res.json(delNews);
    res.end();
}));
exports.default = router;
//# sourceMappingURL=news.admin.js.map