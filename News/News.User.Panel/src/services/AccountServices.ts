
export default {
  authenticationToken() {
    return localStorage.getItem("Authorization");
  },
  isAuthenticated() {
    let token = this.authenticationToken()
    return token != null
  },
};
