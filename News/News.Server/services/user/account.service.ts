import { IncomingHttpHeaders } from "http";
import sequlize from "../../dataBase/context/index"

export class AccountService {
    async login(user) {
        let findUser = await sequlize.models.User.findOne({});
        if (findUser != null) { }
        return { status: false, title: "حساب کاربری با این مشخصات یافت نشد" }
    }

    async signup(user) { }

    async logout(req) { }

    async activateion(user) { }

    async changePassword(user) { }

    async forgotPassword(user) { }

    async getUser(headers: IncomingHttpHeaders) {
        let sessionValue: string = headers["authorization"];
        if (sessionValue != null) {
            let session = await sequlize.models.Session.findOne({ where: { value: sessionValue } });
            if (session != null) {
                let user = await sequlize.models.User.findOne({ where: { id: session.get().UserId } })
                return user.get();
            } else {
                return null;
            }
        }
        return null;
    }

}
