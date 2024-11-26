const express = require("express");
const { login, register, checkEmailExists, logout } = require("../controllers/auth.js");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/checkemail",checkEmailExists);
router.post("/logout", logout);

module.exports = router;
