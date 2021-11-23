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
        image: body.image,
        fullName: body.fullName,
        email:body.email
    }))
    res.end()
})

export default router;