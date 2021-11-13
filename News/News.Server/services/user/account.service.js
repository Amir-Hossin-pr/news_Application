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
exports.AccountService = void 0;
const index_1 = require("../../dataBase/context/index");
class AccountService {
    login(user) {
        return __awaiter(this, void 0, void 0, function* () {
            let findUser = yield index_1.default.models.User.findOne({});
            if (findUser != null) { }
            return { status: false, title: "حساب کاربری با این مشخصات یافت نشد" };
        });
    }
    signup(user) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    logout(req) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    activateion(user) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    changePassword(user) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    forgotPassword(user) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    getUser(headers) {
        return __awaiter(this, void 0, void 0, function* () {
            let sessionValue = headers["authorization"];
            if (sessionValue != null) {
                let session = yield index_1.default.models.Session.findOne({ where: { value: sessionValue } });
                if (session != null) {
                    let user = yield index_1.default.models.User.findOne({ where: { id: session.get().UserId } });
                    return user.get();
                }
                else {
                    return null;
                }
            }
            return null;
        });
    }
}
exports.AccountService = AccountService;
//# sourceMappingURL=account.service.js.map