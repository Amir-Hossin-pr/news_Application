import * as express from 'express';
const router = express.Router();
import { messages } from "../../consts/index"
import { AccountService } from "../../services/user/account.service";
import { NewsServices } from "../../services/news/news.service";

const accountServices = new AccountService();
const newsServices = new NewsServices();

router.use(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let user = await accountServices.getUser(req.headers);
    if (user != null) {
        if (user.RoleId == 1) {
            next();
        }
        else {
            res.json(messages.accessDenied("You do not have access to this"));
            res.end();
        }
    }
    else {
        res.json(messages.accessDenied("You do not have access to this"));
        res.end();
    }
})

router.get("/:page/:count", async (req: express.Request, res: express.Response) => {
    let news = await newsServices.getAdminNews({
        page: parseInt(req.params.page),
        count: parseInt(req.params.count)
    })
    res.json(news);
    res.end();
})

router.post("/create", async (req: express.Request, res: express.Response) => {
    let body = req.body;

    let creaeted = await newsServices.createNews({
        title: body.title,
        isActive: body.isActive,
        shortDescription: body.shortDescription,
        text: body.text,
        base64: body.base64
    })
    res.json(creaeted);
    res.end();
})

router.post("/update", async (req: express.Request, res: express.Response) => {
    let body = req.body;

    let updated = await newsServices.updateNews({
        id: body.id,
        title: body.title,
        isActive: body.isActive,
        shortDescription: body.shortDescription,
        text: body.text,
        base64: body.base64
    })
    res.json(updated);
    res.end();
})

router.post("/delete", async (req: express.Request, res: express.Response) => {
    let delNews = await newsServices.deleteNews(req.body.id)
    res.json(delNews);
    res.end();
})

export default router;