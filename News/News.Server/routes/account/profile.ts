import * as express from 'express'
const router = express.Router();
import { ProfileService } from "../../services/user/profile.service"

const profileService = new ProfileService()

router.get("/", async (req: express.Request, res: express.Response) => {
    let profile = await profileService.getProfile(req.headers)
    res.json(profile)
    res.end()
})

router.post("/", async (req: express.Request, res: express.Response) => {
    let body = req.body;
    res.json(await profileService.updateProfile(req.headers, {
        base64: body.base64,
        fullName: body.fullName
    }))
    res.end()
})

export default router;