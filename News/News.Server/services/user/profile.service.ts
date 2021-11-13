import { IncomingHttpHeaders } from "http2";
import { AccountService } from "../user/account.service"
import { messages } from "../../consts/index"

const accountService = new AccountService();

export class ProfileService {
    async getProfile(header: IncomingHttpHeaders) {
        let user = await accountService.getUser(header);
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
            }
        }
        return messages.userNotFound;
    }

    async updateProfile(header: IncomingHttpHeaders, profile: Profile) {

    }
}

type Profile = {
    fullName: string;
    email: string;
    base64: string;
}