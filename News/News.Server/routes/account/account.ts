import * as express from 'express'
import { messages } from '../../consts';
const router = express.Router();
import { AccountService } from "../../services/user/account.service";

const accountService = new AccountService();

router.post("/login", async (req: express.Request, res: express.Response) => {
    let user = {
        userName: req.body.userName,
        password: req.body.password
    }

    let login = await accountService.login(user);
    res.json(login);
})

router.post("/signup", async (req: express.Request, res: express.Response) => {
  let body = req.body;
let user:UserSignup = {
  userName:body.userName,
  fullName:body.fullName,
  password:body.password, 
  email:body.email,
  mobileNo:body.mobileNo
};
let signup = await accountService.signUp(user);
res.json(signup);
res.end();
})

router.post("/forgotPassword", async (req: express.Request, res: express.Response) => {

})

router.post("/changePassword", async (req: express.Request, res: express.Response) => {

})

router.post("/activation", async (req: express.Request, res: express.Response) => {

})

router.get("/logout", async (req: express.Request, res: express.Response) => {
    return accountService.logout(req.headers) ?
        res.json({
            status: true,
            code: 200,
            title: 'Success',
            message: 'Logout Successfully'
        }) :
        res.json(messages.exception)
})

export default router;