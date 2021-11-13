import * as express from 'express';
const route = express.Router();
import { messages } from "../../consts/index"
import { AccountService } from "../../services/user/account.service";

const accountServices = new AccountService();

route.use(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let user = await accountServices.getUser(req.headers);
    if (user != null) {
        next();
    }
    else {
        res.json(messages.accessDenied);
        res.end();
    }
})

route.get("/", (req: express.Request, res: express.Response) => {
    res.json({ Admin: true })
})

export default route;