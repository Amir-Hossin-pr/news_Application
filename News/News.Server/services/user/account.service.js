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
const crypto = require("crypto");
const index_2 = require("../../consts/index");
class AccountService {
    login(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let passwordHash = this.createHash(user.password);
                let findUser = yield (yield index_1.default.models.User.findOne({ where: { userName: user.userName } })).get();
                if (findUser != null && findUser.password == passwordHash) {
                    let date = new Date();
                    date.setDate(date.getDay() + 10);
                    let session = {
                        key: "authorization",
                        value: this.createSession(),
                        UserId: findUser.id,
                        expireDate: date
                    };
                    yield index_1.default.models.Session.create(session);
                    return {
                        status: true,
                        code: 200,
                        title: 'Success',
                        message: 'Login Successfully',
                        session: {
                            key: session.key,
                            value: session.value
                        }
                    };
                }
                return {
                    status: false,
                    code: 404,
                    title: "حساب کاربری با این مشخصات یافت نشد"
                };
            }
            catch (e) {
                console.log(e.message);
                return index_2.messages.exception;
            }
        });
    }
    signup(user) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    logout(header) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let session = yield this.getSession(header);
                index_1.default.models.Session.destroy({
                    where: {
                        id: session.id
                    }
                });
                return true;
            }
            catch (_a) {
                return false;
            }
        });
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
            let session = yield this.getSession(headers);
            if (session != null) {
                let user = yield index_1.default.models.User.findOne({ where: { id: session.UserId } });
                return user.get();
            }
            else
                return null;
        });
    }
    getSession(headers) {
        return __awaiter(this, void 0, void 0, function* () {
            let sessionValue = headers["authorization"];
            if (sessionValue != null) {
                let session = yield index_1.default.models.Session.findOne({ where: { value: sessionValue } });
                return session.get();
            }
            return null;
        });
    }
    createSession() {
        let newId = crypto.randomUUID() + "-" + crypto.randomUUID();
        let hashSession = this.createHash(newId);
        return hashSession;
    }
    createHash(string) {
        return crypto.createHash("sha256").update(string, "binary").digest("base64");
    }
}
exports.AccountService = AccountService;
//# sourceMappingURL=account.service.js.map