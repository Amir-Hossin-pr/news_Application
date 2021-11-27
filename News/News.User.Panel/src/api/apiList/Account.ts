import { apiCall, changeConfigHeader, exception } from "../ApiCall";
import { messages } from "@/consts/";
import * as models from "../models";
import { AxiosResponse } from "axios";

export default class AccountApiCall {

    async login(login: models.Login) {
        try {
            let request: AxiosResponse = await apiCall.post("/account/login", login)
            let response = await request.data;
            if (response.status) {
                localStorage.setItem(response.session.key, response.session.value)
            }
            return response;
        }
        catch {
            return {
                title: messages.networkError
            }
        }
    }

    async updateProfile(profile: models.Profile) {
        try {
            let request: AxiosResponse = await apiCall.post("/profile", profile)
            let response = await request.data;
            return response
        }
        catch {
            return {
                title: messages.networkError
            }
        }
    }

    async signUp(signUp: models.Signup) {
        try {
            let request: AxiosResponse = await apiCall.post("/account/signUp", signUp)
            let response = await request.data;
            return response;
        }
        catch {
            return {
                title: messages.networkError
            }
        }
    }

    async getProfile() {
        try {
            let request: AxiosResponse = await apiCall.get("/profile")
            let response = await request.data
            return response
        }
        catch {
            return {
                title: messages.networkError
            }
        }
    }

    async logout() {
        try {
            let request: AxiosResponse = await apiCall.get("/account/logout")
            let response = await request.data;
            if (response.status) {
                localStorage.clear();
            }
            return response;
        }
        catch {
            return {
                title: messages.networkError
            }
        }
    }
};
