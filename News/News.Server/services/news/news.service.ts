
import sequlize from "../../dataBase/context/index"
import { messages } from "../../consts/index"

export default class NewsServices {
    async getClientNews(page: number, count: number) {
        try {
            let news = await sequlize.models.News.findAndCountAll({
                where: { isActive: true },
                limit: count,
                offset: (page * count),
            });
            return {
                status: true,
                code: 200,
                title: '?????',
                list: news.rows,
                pages: news.count / count
            }
        } catch {
            return messages.exception
        }
    }

    async createNews(news) {
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

