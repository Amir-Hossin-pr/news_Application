import { apiCall, changeConfigHeader, exception } from "../ApiCall";
import { messages } from "@/consts/";

export default {
  async login(login) {
    try {
      let request = await apiCall.post("Account/Login", login);
      let json = await request.data;
      if (json.status) {
        localStorage.setItem(json.result.key, json.result.token);
        changeConfigHeader("Authorization", json.result.token);
      }
      return {
        status: json.status,
        title: json.title,
        message: json.message,
        key: json.result?.key ?? "",
        value: json.result?.token ?? "",
      };
    } catch {
      return exception;
    }
  },
  async signup(newUser) {
    try {
      let request = await apiCall.post("Account/Signup", newUser);
      let json = await request.data;
      return {
        status: json.status,
        title: json.title,
        message: json.message,
        key: json.result?.key ?? "",
        value: json.result?.token ?? "",
      };
    } catch {
      return exception;
    }
  },
  async logout() {
    try {
      let request = await apiCall.get("Account/Signout");
      let json = await request.data;
      if (json.status) {
        localStorage.clear();
      }
      return {
        status: json.status,
        title: json.title,
        message: json.message,
      };
    } catch {
      return exception;
    }
  },
  async activeAccount(activation) {
    try {
      let request = await apiCall.post("Account/ActiveAccount", activation);
      let json = await request.data;
      return {
        status: json.status,
        title: json.title,
        message: json.message,
      };
    } catch {
      return exception;
    }
  },
  async getNewCode(userName) {
    try {
      let request = await apiCall.get(
        `Account/GetNewActiveCode?userName=${userName}`
      );
      let json = await request.data;
      return json;
    } catch {
      return exception;
    }
  },
  async changePassword(changePassword) {
    try {
      let request = await apiCall.post(
        "Account/ChangePassword",
        changePassword
      );
      let json = await request.data;
      return {
        status: json.status,
        title: json.title,
        message: json.message,
      };
    } catch {
      return exception;
    }
  },
  async getProfile() {
    try {
      if (!navigator.onLine) {
        let profileStorge = localStorage.getItem("profile");
        if (profileStorge != null)
          return this.returnProfile(JSON.parse(profileStorge));
        else
          return {
            status: false,
            title: messages.networkError,
          };
      } else {
        let request = await apiCall.get("Profile/GetProfile");
        let json = await request.data;
        if (json.status) {
          localStorage.setItem("profile", JSON.stringify(json));
        }
        return this.returnProfile(json);
      }
    } catch {
      return exception;
    }
  },
  returnProfile(profile) {
    return {
      status: profile.status,
      title: profile.title,
      message: profile.message,
      profile: profile.result,
    };
  },
  async updateProfile(profile) {
    try {
      let request = await apiCall.post("Profile/UpdateProfile", profile);
      let json = await request.data;
      if (json.status) {
        localStorage.setItem("profile", JSON.stringify(json));
      }
      return this.returnProfile(json);
    } catch {
      return exception;
    }
  },
  async checkUserName(userName) {
    try {
      let request = await apiCall.post("profile/CheckUserName", {
        userName: userName,
      });
      let json = await request.data;
      return {
        status: json.status,
        title: json.title,
        message: json.message,
        codes: json.code,
      };
    } catch {
      return exception;
    }
  },
  async forgetPasswordCode(forgetPassword) {
    try {
      let request = await apiCall.post(
        "Account/ForgetPasswordCode",
        forgetPassword
      );
      let json = await request.data;
      return {
        status: json.status,
        title: json.title,
        message: json.message,
      };
    } catch {
      return exception;
    }
  },
  async forgetPasswordComplete(forgetPassword) {
    try {
      let request = await apiCall.post(
        "Account/ForgetPasswordComplete",
        forgetPassword
      );
      let json = await request.data;
      return {
        status: json.status,
        title: json.title,
        message: json.message,
      };
    } catch {
      return exception;
    }
  },
};
