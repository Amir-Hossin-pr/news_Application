import {
  IncomingHttpHeaders
} from "http";
import sequlize from "../../dataBase/context/index"
import * as crypto from 'crypto'
import {
  messages
} from "../../consts/index"


export class AccountService {
  async login(user) {
    try {
      let passwordHash = this.createHash(user.password);
      let findUser = await (await sequlize.models.User.findOne({
        where: {
          userName: user.userName
        }
      })).get();
      if (findUser != null && findUser.password == passwordHash) {
        let date = new Date();
        date.setDate(date.getDay() + 10);

        let session = {
          key: "authorization",
          value: this.createSession(),
          UserId: findUser.id,
          expireDate: date
        }
        await sequlize.models.Session.create(session);
        return {
          status: true,
          code: 200,
          title: 'Success',
          message: 'Login Successfully',
          session: {
            key: session.key,
            value: session.value
          }
        }
      }
      return {
        status: false,
        code: 404,
        title: "حساب کاربری با این مشخصات یافت نشد"
      }
    } catch (e) {
      console.log(e.message);
      return messages.exception;
    }
  }

  async signup(user: UserSignup) {
    try {
      let existUser = await this.getUserByUserName(user.userName);
      if (user == null) {
        let newUser = this.createUser(user);
        await sequlize.models.User.create(newUser)
        return messages.success("Signup Successfully", "please chek your email and active account")
      }
      return messages.userExist;
    }
    catch {
      return messages.exception;
    }
  }

  async logout(header: IncomingHttpHeaders) {
    try {
      let session = await this.getSession(header);
      sequlize.models.Session.destroy({
        where: {
          id: session.id
        }
      })
      return true;
    }
    catch
    {
      return false;
    }
  }

  async activateion(user) {}

  async changePassword(user) {}

  async forgotPassword(user) {}

  async getUser(headers: IncomingHttpHeaders) {
    let session = await this.getSession(headers);
    if (session != null) {
      let user = await sequlize.models.User.findOne({
        where: {
          id: session.UserId
        }
      })
      return user.get();
    } else
      return null;
  }

  async getSession(headers: IncomingHttpHeaders) {
    let sessionValue: string = headers["authorization"];
    if (sessionValue != null) {
      let session = await sequlize.models.Session.findOne({
        where: {
          value: sessionValue
        }
      });
      return session.get();
    }
    return null;
  }

  async getUserByUserName(userName: string) {}

  createSession() {
    let newId = crypto.randomUUID() + "-" + crypto.randomUUID();
    let hashSession = this.createHash(newId);
    return hashSession;
  }

  createHash(string: string) {
    return crypto.createHash("sha256").update(string, "binary").digest("base64");
  }

  createUser(user: UserSignup) {
    return
    {
      userName: user.userName,
      password: this.createHash(user.password),
      mobileNo: user.mobileNo,
      activeCode: this.createActiveCode(),
      isActive: false,
      image: "null.png",
      fullName: user.fullName
    }
  }

  createActiveCode() {
    let random = crypto.randomUUID().toString().replace("-", "");
    return random[1..6]
  }
}

type UserSignup = {
  userName: string;
  fullName: string;
  mobileNo: string;
  password: string;
}

type ActivationAccount = {
  userName: string;
  activeCode: string;
}