
import * as express from 'express'
const router = express.Router();
import { NewsServices } from "../../services/news/news.service"

const newsServices = new NewsServices();

router.get("/:page/:count", async (req: express.Request, res: express.Response) => {
    let news = await newsServices.getClientNews({
        page: parseInt(req.params.page),
        count: parseInt(req.params.count)
    });
    res.json(news);
    res.end()
})


router.get("/search", async (req: express.Request, res: express.Response) => {
    let query: any = req.query;
    let news = await newsServices.search(query.q, {
        page: parseInt(query.page),
        count: parseInt(query.count)
    })
    res.json(news);
    res.end()
})

router.get("/getNewsItem", async (req: express.Request, res: express.Response) => {
    let query: any = req.query;
    let newsItem = await newsServices.getNewsItem(parseInt(query.id))
    res.json(newsItem);
    res.end()
})

export default router;