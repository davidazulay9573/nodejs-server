const router = require("express").Router();
const { loginSchema, registerSchema } = require("../models/users");
const validation = require("../middleware/validation");
const { signUp, signIn } = require("../crud/connection");

router.post("/sign-up", validation(registerSchema), signUp);

router.post("/sign-in", validation(loginSchema), signIn);

module.exports = router;
