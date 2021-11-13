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
const index_1 = require("../../dataBase/context/index");
function login(user) {
    return __awaiter(this, void 0, void 0, function* () {
        let findUser = yield index_1.default.models.User.findOne({});
        if (findUser != null) { }
        return { status: false, title: "حساب کاربری با این مشخصات یافت نشد" };
    });
}
function signup(user) {
    return __awaiter(this, void 0, void 0, function* () { });
}
function logout(req) {
    return __awaiter(this, void 0, void 0, function* () { });
}
function activateion(user) {
    return __awaiter(this, void 0, void 0, function* () { });
}
function changePassword(user) {
    return __awaiter(this, void 0, void 0, function* () { });
}
function forgotPassword(user) {
    return __awaiter(this, void 0, void 0, function* () { });
}
module.exports = {
    login,
    signup,
    changePassword,
    activateion,
    forgotPassword,
    logout,
};
//# sourceMappingURL=account.service.js.map