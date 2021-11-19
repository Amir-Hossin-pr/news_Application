import VueRouter, { NavigationGuardNext, Route, RouteConfig, RouterOptions } from "vue-router"
import Vue from "vue"
import store from "../store/index"
import pipeLine from "./middlewarePipeline"
import auth from "./middleware/auth"

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'home',
        component: () => import("@/layout/home.vue"),
        meta: (route: Route) => ({
            title: 'Home',
            route: route
        })
    }, {
        path: '/account',
        name: 'account',
        component: () => import("@/layout/account.vue"),
        meta: (route: Route) => ({
            title: 'Account',
            route: route,
        }),
        children: [
            {
                path: "",
                name: "profile",
                component: () => import("@/pages/account/Profile.vue"),
                meta: (route: Route) => ({
                    title: 'Profile',
                    route: route,
                    middleware: auth
                }),
            }
        ]
    }]

const router = new VueRouter({
    routes: routes,
    mode: "history"
})

router.beforeEach((to: any, from: Route, next: NavigationGuardNext<Vue>) => {
    let meta = to.meta(to)

    if (!meta.middleware) {
       return next();
    }

    const middleware = meta.middleware;
    const context = {
        to, from, next, store
    }

    return middleware({
        ...context,
        next: pipeLine(context, middleware, 1)
    })
})

export default router