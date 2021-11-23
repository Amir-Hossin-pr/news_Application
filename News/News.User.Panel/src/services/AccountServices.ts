
export default {
    authenticationToken() {
        return localStorage.getItem("authorization");
    },
    isAuthenticated() {
        let token = this.authenticationToken()
        return token != null
    },
};
