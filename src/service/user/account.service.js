const {models} = require("../../database/context/index")

async function login(user) {
  let findUser = await modles.User.find({})
  if(findUser!= null)
  {} 
  return {status:false, title:"حساب کاربری با این مشخصات یافت نشد" } 
}

async function signup(user) {}

async function logout(req) {}

async function signup(user) {}

async function activateion(user) {}

async function changePassword(user) {}

async function forgotPassword(user) {}

module.exports = {
  login,
  signup,
  changePassword,
  activateion,
  forgotPassword,
  logout,
};
