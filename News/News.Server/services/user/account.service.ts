import sequlize from "../../dataBase/context/index"

async function login(user) {
    let findUser = await sequlize.models.User.findOne({});
    if (findUser != null) { }
    return { status: false, title: "حساب کاربری با این مشخصات یافت نشد" }
}

async function signup(user) { }

async function logout(req) { }

async function activateion(user) { }

async function changePassword(user) { }

async function forgotPassword(user) { }

module.exports = {
    login,
    signup,
    changePassword,
    activateion,
    forgotPassword,
    logout,
};
