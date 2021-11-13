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
const console_1 = require("console");
const index_1 = require("../../dataBase/context/index");
class NewsServices {
    getClientNews(page, count) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, console_1.log)({ page, count });
            try {
                let news = yield index_1.default.models.News.findAndCountAll({
                    where: { isActive: true },
                    limit: count,
                    offset: (page * count),
                });
                return {
                    list: news.rows,
                    pages: news.count / count
                };
            }
            catch (err) {
                console.log(err.message);
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
                return false;
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
                return false;
            }
        });
    }
}
exports.default = NewsServices;
//# sourceMappingURL=news.service.js.map