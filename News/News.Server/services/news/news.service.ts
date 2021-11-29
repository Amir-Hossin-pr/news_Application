
import sequlize from "../../dataBase/context/index"
import { messages } from "../../consts/index"
import { PaginationModel } from "../pagination";
import { createImageAddress, saveImage } from "../image.service"
import { Op } from "sequelize";

export class NewsServices {
    async getClientNews(pagination: PaginationModel) {
        try {
            let news = await sequlize.models.News.findAndCountAll({
                where: { isActive: true },
                limit: pagination.count,
                offset: (pagination.page * pagination.count),
            });
            return await this.createNewsListResult(news, pagination.count)
        }
        catch (e) {
            return messages.exception(e.message);
        }
    }

    async getAdminNews(pagination: PaginationModel) {
        try {
            let news = await sequlize.models.News.findAndCountAll({
                limit: pagination.count,
                offset: (pagination.page * pagination.count),
            });
            return await this.createNewsListResult(news, pagination.count)
        }
        catch (e) {
            return messages.exception(e.message);
        }
    }

    async createNewsListResult(news, count: number) {
        news.rows.forEach((news) => {
            news.get().image = createImageAddress(news.get().image, "news")
        })

        return {
            status: true,
            code: 200,
            title: 'Success',
            list: news.rows,
            pages: news.count / count
        }
    }

    async search(q: string, pagination: PaginationModel) {
        try {
            let news = await sequlize.models.News.findAndCountAll({
                where: {
                    isActive: true,
                    [Op.or]: {
                        title: {
                            [Op.like]: `%${q}%`
                        },
                        shortDescription: {
                            [Op.like]: `%${q}%`
                        }
                    }
                },
                limit: pagination.count,
                offset: (pagination.page * pagination.count),
            });
            return await this.createNewsListResult(news, pagination.count)
        }
        catch (e) {
            return messages.exception(e.message);
        }
    }

    async getNewsItem(id: number) {
        try {
            let item = await sequlize.models.News.findOne({ where: { id: id } })
            if (item) {
                item.get().image = createImageAddress(item.get().image, "news")
                return messages.success({
                    title: "Success",
                    message: "Success To Find News",
                    result: item
                })
            }
            return messages.notFound(`Can not found News Item with id ${id}`)
        }
        catch (e) {
            return messages.exception(e.message);
        }
    }

    async createNews(news: NewsModel) {
        try {
            let image = await saveImage({
                base64: news.base64,
                path: "news"
            })

            let recentNews = {
                title: news.title,
                shortDescription: news.shortDescription,
                isActive: news.isActive,
                text: news.text,
                image: image
            }

            let created = await (await sequlize.models.News.create(recentNews)).get()
            created.image = createImageAddress(recentNews.image, "news");

            return messages.success({
                title: "Success",
                message: "New news was made successfully",
                result: created
            })
        } catch (e) {
            return messages.exception(e.message)
        }
    }

    async updateNews(news: NewsModel) {
        try {
            let findNews = await sequlize.models.News.findOne({ where: { id: news.id } });
            if (findNews) {
                let image = (news.base64 != "" && news.base64.indexOf("http") == -1) ?
                    await saveImage({
                        base64: news.base64,
                        path: "news"
                    }) :
                    findNews.get().image

                let updated = await findNews.update({
                    image: image,
                    title: news.title,
                    text: news.text,
                    shortDescription: news.shortDescription,
                    isActive: news.isActive
                })
                updated.get().image = createImageAddress(updated.get().image, "news");
                return messages.success({
                    title: "Success",
                    message: "Update News Successfully",
                    result: updated
                })
            } else
                return messages.notFound("No news you want to update")
        }
        catch (e) {
            return messages.exception(e.message)
        }
    }

    async deleteNews(id: number) {
        try {
            await sequlize.models.News.destroy({ where: { id: id } })
            return messages.success({
                title: "Success",
                message: "Success to delete news",
                result: {}
            })
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
