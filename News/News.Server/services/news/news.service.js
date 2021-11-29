"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsServices = void 0;
const index_1 = require("../../dataBase/context/index");
const index_2 = require("../../consts/index");
const image_service_1 = require("../image.service");
const sequelize_1 = require("sequelize");
class NewsServices {
    getClientNews(pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let news = yield index_1.default.models.News.findAndCountAll({
                    where: { isActive: true },
                    limit: pagination.count,
                    offset: (pagination.page * pagination.count),
                });
                return yield this.createNewsListResult(news, pagination.count);
            }
            catch (e) {
                return index_2.messages.exception(e.message);
            }
        });
    }
    getAdminNews(pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let news = yield index_1.default.models.News.findAndCountAll({
                    limit: pagination.count,
                    offset: (pagination.page * pagination.count),
                });
                return yield this.createNewsListResult(news, pagination.count);
            }
            catch (e) {
                return index_2.messages.exception(e.message);
            }
        });
    }
    createNewsListResult(news, count) {
        return __awaiter(this, void 0, void 0, function* () {
            news.rows.forEach((news) => {
                news.get().image = (0, image_service_1.createImageAddress)(news.get().image, "news");
            });
            return {
                status: true,
                code: 200,
                title: 'Success',
                list: news.rows,
                pages: news.count / count
            };
        });
    }
    search(q, pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let news = yield index_1.default.models.News.findAndCountAll({
                    where: {
                        isActive: true,
                        [sequelize_1.Op.or]: {
                            title: {
                                [sequelize_1.Op.like]: `%${q}%`
                            },
                            shortDescription: {
                                [sequelize_1.Op.like]: `%${q}%`
                            }
                        }
                    },
                    limit: pagination.count,
                    offset: (pagination.page * pagination.count),
                });
                return yield this.createNewsListResult(news, pagination.count);
            }
            catch (e) {
                return index_2.messages.exception(e.message);
            }
        });
    }
    getNewsItem(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let item = yield index_1.default.models.News.findOne({ where: { id: id } });
                if (item) {
                    item.get().image = (0, image_service_1.createImageAddress)(item.get().image, "news");
                    return index_2.messages.success({
                        title: "Success",
                        message: "Success To Find News",
                        result: item
                    });
                }
                return index_2.messages.notFound(`Can not found News Item with id ${id}`);
            }
            catch (e) {
                return index_2.messages.exception(e.message);
            }
        });
    }
    createNews(news) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let image = yield (0, image_service_1.saveImage)({
                    base64: news.base64,
                    path: "news"
                });
                let recentNews = {
                    title: news.title,
                    shortDescription: news.shortDescription,
                    isActive: news.isActive,
                    text: news.text,
                    image: image
                };
                let created = yield (yield index_1.default.models.News.create(recentNews)).get();
                created.image = (0, image_service_1.createImageAddress)(recentNews.image, "news");
                return index_2.messages.success({
                    title: "Success",
                    message: "New news was made successfully",
                    result: created
                });
            }
            catch (e) {
                return index_2.messages.exception(e.message);
            }
        });
    }
    updateNews(news) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let findNews = yield index_1.default.models.News.findOne({ where: { id: news.id } });
                if (findNews) {
                    let image = (news.base64 != "" && news.base64.indexOf("http") == -1) ?
                        yield (0, image_service_1.saveImage)({
                            base64: news.base64,
                            path: "news"
                        }) :
                        findNews.get().image;
                    let updated = yield findNews.update({
                        image: image,
                        title: news.title,
                        text: news.text,
                        shortDescription: news.shortDescription,
                        isActive: news.isActive
                    });
                    updated.get().image = (0, image_service_1.createImageAddress)(updated.get().image, "news");
                    return index_2.messages.success({
                        title: "Success",
                        message: "Update News Successfully",
                        result: updated
                    });
                }
                else
                    return index_2.messages.notFound("No news you want to update");
            }
            catch (e) {
                return index_2.messages.exception(e.message);
            }
        });
    }
    deleteNews(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield index_1.default.models.News.destroy({ where: { id: id } });
                return index_2.messages.success({
                    title: "Success",
                    message: "Success to delete news",
                    result: {}
                });
            }
            catch (_a) {
                return index_2.messages.exception;
            }
        });
    }
}
exports.NewsServices = NewsServices;
//# sourceMappingURL=news.service.js.map