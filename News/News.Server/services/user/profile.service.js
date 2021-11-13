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
exports.ProfileService = void 0;
const account_service_1 = require("../user/account.service");
const index_1 = require("../../consts/index");
const accountService = new account_service_1.AccountService();
class ProfileService {
    getProfile(header) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield accountService.getUser(header);
            if (user != null) {
                return {
                    status: true,
                    code: 200,
                    title: 'User Profile',
                    message: '',
                    profile: {
                        fullName: user.fullName,
                        userName: user.userName,
                        mobileNo: user.mobileNo,
                        email: user.email,
                        image: `/images/profile/${user.image}`
                    }
                };
            }
            return index_1.messages.userNotFound;
        });
    }
    updateProfile(header, profile) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.ProfileService = ProfileService;
//# sourceMappingURL=profile.service.js.map