const router = require("express").Router();
const { cardSchema, bizNumberSchema } = require("../models/cards");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const validation = require("../middleware/validation");
const {
  getCard,
  getCards,
  updatedCard,
  deleteCard,
  LikeAndDisLike,
  createCard,
  switchBizNumber,
} = require("../crud/cards");

router.get("/", getCards);

router.post(
  "/",
  authentication(),
  authorization("isBusiness", "isAdmin"),
  validation(cardSchema),
  createCard
);

router.get(
  "/:id",
   authentication(),
   getCard);

router.put(
  "/:id",
  authentication(),
  authorization("cardOwner"),
  validation(cardSchema),
  updatedCard
);

router.delete(
  "/:id",
  authentication(),
  authorization("isAdmin", "cardOwner"),
  deleteCard
);

router.patch(
  "/:id",
  authentication(),
   LikeAndDisLike);

router.post(
  "/:id",
  authentication(),
  authorization("isAdmin"),
  validation(bizNumberSchema),
  switchBizNumber
);

module.exports = router;
