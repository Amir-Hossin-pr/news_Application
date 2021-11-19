import { Middleware } from "./types";


export default function (middleware: Middleware) {
    if (middleware.store.getters.auth.isLogin) {
        return middleware.next({
            name: "account"
        });
    }
    return middleware.next();
}