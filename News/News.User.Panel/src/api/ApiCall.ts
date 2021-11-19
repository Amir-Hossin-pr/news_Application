import Axios from "axios";
import Account from "@/services/AccountServices";

const _config = {
    baseURL: "https://localhost:3000/api/",
    timeout: 60 * 1000,
    headers: {
        "Content-Type": "application/json",
        Authorization: Account.authenticationToken(),
    },
};

export const changeConfigHeader = (key: any, value: any) => {
    _config[key] = value;
};

export const exception = {
    status: false,
    title: "خطایی رخ داد",
    message: "خطایی در برقرای ارتباط با سرور پیش آمد",
};

export const apiCall = Axios.create(_config);
