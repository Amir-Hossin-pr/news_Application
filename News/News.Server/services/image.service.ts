import * as crypto from 'crypto'
import * as fs from 'fs'

export async function saveImage(image: SaveImage) {
    if (image.base64 != "") {
        try {
            const type = image.base64.split(';')[0].split('/')[1];
            console.log(type);
            let imageName = crypto.randomUUID() + Date.now() + `.${type}`;
            let path = `public/images/${image.path}/` + imageName;
            const base64Data = image.base64.replace(/^data:([A-Za-z+/]+);base64,/, '');
            fs.writeFileSync(path, base64Data, { encoding: "base64" })
            return imageName;
        } catch {
            return "null.png";
        }
    }
    return "null.png";
}


export function createImageAddress(imgName: string, folder: string) {
    let url = `http://localhost:3000/images/${folder}/${imgName}`
    return url
}

type SaveImage = {
    base64: string;
    path: string;
}