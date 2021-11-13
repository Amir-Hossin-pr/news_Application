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
class NewsServices {
    getClientNews(pagination) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let news = yield index_1.default.models.News.findAndCountAll({
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
                };
            }
            catch (_a) {
                return index_2.messages.exception;
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
                return {
                    status: true,
                    code: 200,
                    title: 'Success',
                    list: news.rows,
                    pages: news.count / pagination.count
                };
            }
            catch (_a) {
                return index_2.messages.exception;
            }
        });
    }
    createNews(news) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield index_1.default.models.News.create(news);
                return true;
            }
            catch (_a) {
                return index_2.messages.exception;
            }
        });
    }
    deleteNews(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield index_1.default.models.News.drop(id);
                return true;
            }
            catch (_a) {
                return index_2.messages.exception;
            }
        });
    }
}
exports.NewsServices = NewsServices;
//# sourceMappingURL=news.service.js.map