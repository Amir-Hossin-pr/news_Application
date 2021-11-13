import * as express from 'express';
const route = express.Router();
import { messages } from "../../consts/index"
import { AccountService } from "../../services/user/account.service";
import { NewsServices } from "../../services/news/news.service";

const accountServices = new AccountService();
const newsServices = new NewsServices();

route.use(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let user = await accountServices.getUser(req.headers);
    if (user != null) {
        if (user.RoleId == 1) {
            next();
        }
        else {
            res.json(messages.accessDenied);
            res.end();
        }
    }
    else {
        res.json(messages.accessDenied);
        res.end();
    }
})

route.get("/:page/:count", async (req: express.Request, res: express.Response) => {
    let news = await newsServices.getAdminNews({
        page: parseInt(req.params.page),
        count: parseInt(req.params.count)
    })
    res.json(news);
    res.end();
})

export default route;