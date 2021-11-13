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
const consts_1 = require("../../consts");
const router = express.Router();
const account_service_1 = require("../../services/user/account.service");
const accountService = new account_service_1.AccountService();
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user = {
        userName: req.body.userName,
        password: req.body.password
    };
    let login = yield accountService.login(user);
    res.json(login);
}));
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
}));
router.post("/forgotPassword", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
}));
router.post("/changePassword", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
}));
router.post("/activation", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
}));
router.get("/logout", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return accountService.logout(req.headers) ?
        res.json({
            status: true,
            code: 200,
            title: 'Success',
            message: 'Logout Successfully'
        }) :
        res.json(consts_1.messages.exception);
}));
exports.default = router;
//# sourceMappingURL=account.js.map