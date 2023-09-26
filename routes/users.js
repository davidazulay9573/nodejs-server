const router = require("express").Router();
const { registerSchema } = require("../models/users");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const validation = require("../middleware/validation");
const {
  getUser,
  getUsers,
  updatedUser,
  deleteUser,
  switchBizStatus,
  getLoggedOnUser,
} = require("../crud/users");

router.get(
  "/",
  authentication(),
  authorization("isBusiness", "isAdmin"),
  getUsers
);

router.get("/me", authentication(), getLoggedOnUser);

router.get(
  "/:id",
  authentication(),
  authorization("isBusiness", "isAdmin", "acountOwner"),
  getUser
);

router.put(
  "/:id",
  authentication(),
  authorization("isAdmin", "acountOwner"),
  validation(registerSchema),
  updatedUser
);

router.delete(
  "/:id",
  authentication(),
  authorization("isAdmin", "acountOwner"),
  deleteUser
);

router.patch(
  "/:id",
  authentication(),
  authorization("isAdmin", "acountOwner"),
  switchBizStatus
);

module.exports = router;
