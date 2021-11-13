import * as express from 'express'
const router = express.Router();
import { ProfileService } from "../../services/user/profile.service"

const pofileService = new ProfileService()

router.get("/", async (req: express.Request, res: express.Response) => {
    let profile = await pofileService.getProfile(req.headers)
    res.json(profile)
    res.end()
})

router.post("/", async (req: express.Request, res: express.Response) => {

})

export default router;