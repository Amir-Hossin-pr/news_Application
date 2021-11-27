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
exports.createImageAddress = exports.saveImage = void 0;
const crypto = require("crypto");
const fs = require("fs");
function saveImage(image) {
    return __awaiter(this, void 0, void 0, function* () {
        if (image.base64 != "") {
            try {
                const type = image.base64.split(';')[0].split('/')[1];
                console.log(type);
                let imageName = crypto.randomUUID() + Date.now() + `.${type}`;
                let path = `public/images/${image.path}/` + imageName;
                const base64Data = image.base64.replace(/^data:([A-Za-z+/]+);base64,/, '');
                fs.writeFileSync(path, base64Data, { encoding: "base64" });
                return imageName;
            }
            catch (_a) {
                return "null.png";
            }
        }
        return "null.png";
    });
}
exports.saveImage = saveImage;
function createImageAddress(imgName, folder) {
    let url = `http://localhost:3000/images/${folder}/${imgName}`;
    return url;
}
exports.createImageAddress = createImageAddress;
//# sourceMappingURL=image.service.js.map