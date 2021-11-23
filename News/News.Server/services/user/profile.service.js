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
const image_service_1 = require("../image.service");
const context_1 = require("../../dataBase/context");
const accountService = new account_service_1.AccountService();
class ProfileService {
    getProfile(header) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield accountService.getUser(header);
                if (user != null) {
                    return {
                        status: true,
                        code: 200,
                        title: 'User Profile',
                        message: '',
                        profile: this.createProfileModel(user)
                    };
                }
                return index_1.messages.userNotFound;
            }
            catch (e) {
                return index_1.messages.exception(e.message);
            }
        });
    }
    updateProfile(header, profile) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield accountService.getUser(header);
                if (user != null) {
                    let findUser = yield context_1.default.models.User.findOne({ where: { id: user.id } });
                    let profileImage = (profile.image != "" && profile.image.indexOf("http") == -1)
                        ? yield (0, image_service_1.saveImage)({ base64: profile.image, path: 'profile' })
                        : user.image;
                    yield findUser.update({
                        fullName: profile.fullName,
                        image: profileImage
                    });
                    return index_1.messages.success({
                        title: 'Successfully',
                        message: 'Profile Updated Successfully',
                        result: this.createProfileModel(yield accountService.getUser(header))
                    });
                }
                return index_1.messages.userNotFound;
            }
            catch (e) {
                return index_1.messages.exception(e.message);
            }
        });
    }
    createProfileModel(user) {
        return {
            fullName: user.fullName,
            userName: user.userName,
            mobileNo: user.mobileNo,
            email: user.email,
            image: `http://localhost:3000/images/profile/${user.image}`
        };
    }
}
exports.ProfileService = ProfileService;
//# sourceMappingURL=profile.service.js.map