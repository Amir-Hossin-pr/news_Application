import { apiCall, changeConfigHeader, exception } from "../ApiCall";
import { messages } from "@/consts/";
import * as models from "../models";
import { AxiosResponse } from "axios";

export default class AccountApiCall {
    async login(login: models.Login) {
        try {
            let request: AxiosResponse = await apiCall.post("/account/login", login)
            let response = await request.data;
            return response;
        }
        catch {

        }
    }
};
