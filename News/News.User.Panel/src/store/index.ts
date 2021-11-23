import Vue from "vue";
import Vuex from "vuex";
import AccountService from "../services/AccountServices"


Vue.use(Vuex);


export default new Vuex.Store({
    state: {
        user: {
            isLogin: AccountService.isAuthenticated()
        }
    },
    getters: {
        auth(state) {
            return state.user;
        }
    },
    mutations: {},
    actions: {},
    modules: {},
})