import VueRouter, { NavigationGuardNext, Route, RouteConfig, RouterOptions } from "vue-router"
import Vue from "vue"
import store from "../store/index"
import pipeLine from "./middlewarePipeline"

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'home',
        meta: (route: Route) => ({
            title: '????',
            route: route
        })
    }]

const router = new VueRouter({
    routes: routes,
    mode: "history"
})

router.beforeEach((to: Route, from: Route, next: NavigationGuardNext<Vue>) => {
    let meta: any = to.meta(to)

    if (!meta.middleware) {
        next();
    }

    const middleware = meta.middelware;
    const context = {
        to, from, next, store
    }

    return middleware({
        ...context,
        next: pipeLine(context, middleware, 1)
    })
})

export default router