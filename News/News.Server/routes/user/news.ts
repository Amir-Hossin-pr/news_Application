
import * as express from 'express'
const router = express.Router();
import NewsServices from "../../services/news/news.service"

const newsServices: NewsServices = new NewsServices();

router.get("/:page/:count", async (req: express.Request, res: express.Response) => {
    let news = await newsServices.getClientNews(parseInt(req.params.page), parseInt(req.params.count));
    res.json(news);
})

export default router;