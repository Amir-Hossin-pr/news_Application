const express = require("express");
const router = express.Router();
const { login } = require("../../service/user/account.service");

router.post("/login", async (req, res) => {
  let user = {
    userName: req.body.userName,
    password: req.body.password,
  };

  let loginRes = await login(user);
  res.json(loginRes);
});

router.post("/signup", (req, res) => {});

router.post("/forgotPassword", (req, res) => {});

router.post("/changePassword", (req, res) => {});

router.get("/logout", (req, res) => {});

module.exports = router;
