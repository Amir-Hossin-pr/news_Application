import VueRouter, { NavigationGuardNext, Route, RouteConfig, RouterOptions } from "vue-router"
import Vue from "vue"
import store from "../store/index"
import pipeLine from "./middlewarePipeline"
import auth from "./middleware/auth"
import changeTitle from "../services/Title"
import guest from "./middleware/guest"

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        component: () => import("@/layout/home.vue"),
        meta: (route: Route) => ({
            title: 'Home',
            route: route
        }),
        children: [
            {
                path: "",
                name: "home",
                component: () => import("@/pages/home/Index.vue"),
                meta: (route: Route) => ({
                    title: 'Home',
                    route: route
                })
            },
            {
                path: "/search",
                name: "search",
                component: () => import("@/pages/news/Search.vue"),
                meta: (route: Route) => ({
                    title: `Search ${route.query.q != null ? route.query.q : ""}`,
                    route: route,
                    hasBackButton: true
                })
            }, {
                path: "/showNews",
                name: "showNews",
                component: () => import("@/pages/news/ShowNews.vue"),
                meta: (route: Route) => ({
                    title: route.query.title,
                    route: route,
                    hasBackButton: true
                })
            }]
    }, {
        path: '/account',
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
                    title: 'User Profile',
                    route: route,
                    middleware: auth
                }),
            },
            {
                path: "/account/login",
                name: "login",
                component: () => import("@/pages/account/Login.vue"),
                meta: (route: Route) => ({
                    title: 'Login',
                    route: route,
                    middleware: guest
                })
            }
        ]
    }]

const router = new VueRouter({
    routes: routes,
    mode: "history"
})

router.beforeEach((to: any, from: Route, next: NavigationGuardNext<Vue>) => {
    let meta = to.meta(to)

    changeTitle(meta.title)

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