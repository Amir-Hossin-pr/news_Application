import { IncomingHttpHeaders } from "http2";
import { AccountService } from "../user/account.service"
import { messages } from "../../consts/index"
import { saveImage } from "../image.service"
import sequlize from "../../dataBase/context";

const accountService = new AccountService();

export class ProfileService {
    async getProfile(header: IncomingHttpHeaders) {
        try {
            let user = await accountService.getUser(header);

            if (user != null) {
                return {
                    status: true,
                    code: 200,
                    title: 'User Profile',
                    message: '',
                    profile: this.createProfileModel(user)
                }
            }
            return messages.userNotFound;
        } catch (e) {
            return messages.exception(e.message)
        }
    }

    async updateProfile(header: IncomingHttpHeaders, profile: Profile) {
        try {
            let user = await accountService.getUser(header);
            if (user != null) {
                let findUser = await sequlize.models.User.findOne({ where: { id: user.id } })
                let profileImage = (profile.image != "" && profile.image.indexOf("http") == -1)
                    ? await saveImage({ base64: profile.image, path: 'profile' })
                    : user.image

                await findUser.update({
                    fullName: profile.fullName,
                    image: profileImage
                })
                return messages.success({
                    title: 'Successfully',
                    message: 'Profile Updated Successfully',
                    result: this.createProfileModel(await accountService.getUser(header))
                })
            }
            return messages.userNotFound;
        } catch (e) {
            return messages.exception(e.message)
        }
    }

    createProfileModel(user) {
        return {
            fullName: user.fullName,
            userName: user.userName,
            mobileNo: user.mobileNo,
            email: user.email,
            image: `http://localhost:3000/images/profile/${user.image}`
        }
    }
}


type Profile = {
    fullName: string;
    image: string;
    email: string
}