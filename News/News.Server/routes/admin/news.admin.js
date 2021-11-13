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
const console_1 = require("console");
const express = require("express");
const route = express.Router();
const index_1 = require("../../consts/index");
const account_service_1 = require("../../services/user/account.service");
const accountServices = new account_service_1.AccountService();
route.use((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield accountServices.getUser(req.headers);
    (0, console_1.log)(user);
    if (user != null) {
        next();
    }
    else {
        res.json(index_1.messages.accessDenied);
        res.end();
    }
}));
route.get("/", (req, res) => {
    res.json({ Admin: true });
});
exports.default = route;
//# sourceMappingURL=news.admin.js.map