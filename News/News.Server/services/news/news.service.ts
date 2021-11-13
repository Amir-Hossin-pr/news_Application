
import sequlize from "../../dataBase/context/index"
import { messages } from "../../consts/index"
import { PaginationModel } from "../pagination";

export class NewsServices {
    async getClientNews(pagination: PaginationModel) {
        try {
            let news = await sequlize.models.News.findAndCountAll({
                where: { isActive: true },
                limit: pagination.count,
                offset: (pagination.page * pagination.count),
            });
            return {
                status: true,
                code: 200,
                title: 'Success',
                list: news.rows,
                pages: news.count / pagination.count
            }
        } catch {
            return messages.exception
        }
    }

    async getAdminNews(pagination: PaginationModel) {
        try {
            let news = await sequlize.models.News.findAndCountAll({
                limit: pagination.count,
                offset: (pagination.page * pagination.count),
            });

            return {
                status: true,
                code: 200,
                title: 'Success',
                list: news.rows,
                pages: news.count / pagination.count
            }
        }
        catch {
            return messages.exception;
        }
    }

    async createNews(news: NewsModel) {
        try {
            await sequlize.models.News.create(news);
            return true;
        } catch {
            return messages.exception
        }
    }

    async deleteNews(id) {
        try {
            await sequlize.models.News.drop(id);
            return true;
        } catch {
            return messages.exception
        }
    }
}

type NewsModel = {
    id?: number;
    title: string;
    shortDescription: string;
    text: string;
    base64: string;
    isActive: boolean;
}
