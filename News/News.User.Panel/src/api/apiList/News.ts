import { apiCall, changeConfigHeader, exception } from "../ApiCall";
import { messages } from "@/consts/";
//import * as models from "../models";
import { AxiosResponse } from "axios";

export default class NewsApi {
    async getNews(page: number, count: number) {
        try {
            let request: AxiosResponse = await apiCall.get(`/news/${page}/${count}`)
            let response = await request.data;
            return response;
        } catch {
            return {
                title: messages.networkError
            }
        }
    }

    async search(q: string, page: number, count: number) {
        try {
            let request: AxiosResponse = await apiCall.get(`/news/search?q=${q}&page=${page}&count=${count}`)
            let response = await request.data;
            return response;
        } catch {
            return {
                title: messages.networkError
            }
        }
    }

    async getNewsItem(id: any) {
        try {
            let request: AxiosResponse = await apiCall.get(`/news/getNewsItem?id=${id}`)
            let response = await request.data;
            return response;
        } catch {
            return {
                title: messages.networkError
            }
        }
    }
}