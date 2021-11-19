import { NavigationGuardNext } from "vue-router";

export type Middleware = {
    store: any;
    next: NavigationGuardNext<Vue>;
}