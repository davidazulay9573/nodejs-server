const { Card ,generateBizNumber} = require("../models/cards");
const sendError = require("../utils/sendError");
const _ = require("lodash");

async function getCard(req, res) {
  try {
    const card = await Card.findById(req.params.id).select("-__v ");
    if (!card) {
      sendError(res, 404, "The card with the given ID was not found");
      return;
    }
    res.send(card);
  } catch (error) {
    if (error.path === "_id") {
      sendError(res, 404, "The card with the given ID was not found");
      return;
    }
    sendError(res, 500, `dbError: ${error.message} `);
  }
}

async function getCards(req, res) {
  try {
    const { user } = req.query;
    const cards = user
      ? await Card.find({ user_id: user }).select("-__v -bizNumber")
      : await Card.find().select("-__v -bizNumber");
    if (!cards.length) {
      res.send("Dont have cards yet");
      return;
    }
    res.send(cards);
  } catch (error) {
    sendError(res, 500, `dbError: ${error.message} `);
  }
}

async function createCard(req, res) {
  try {
    const card = new Card({
      ...req.body,
      bizImage:
        req.body.bizImage ||
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      bizNumber: await generateBizNumber(),
      user_id: req.user._id,
    });
    await card.save();

    res.send(
      _.pick(card, ["title", "description", "_id", "user_id", "address"])
    );
  } catch (error) {
    sendError(res, 500, `dbError: ${error.message} `);
  }
}

async function updatedCard(req, res) {
  try {
    
    const card = await Card.findOneAndUpdate(
      { _id: req.params.id },
      { ...req.body },
      { new: true }
    ).select("-__v -bizNumber");
    if (!card) {
      sendError(res, 404, "The card with the given ID was not found");
      return;
    }
    res.send(card);
  } catch (error) {
    if (error.path == "_id") {
      sendError(res, 404, "The card with the given ID was not found");
      return;
    }
    sendError(res, 500, `dbError: ${error.message} `);
  }
}

async function deleteCard(req, res) {
  try {
   const card = await Card.findOneAndDelete({ _id: req.params.id });
    if (!card) {
      sendError(res, 404, "The card with the given ID was not found");
      return;
    }
    res.send("the card deleted successfully");
  } catch (error) {
    if (error.path === "_id") {
      sendError(res, 404, "The card with the given ID was not found");
      return;
    }
    sendError(res, 500, `dbError: ${error.message} `);
  }
}

async function LikeAndDisLike(req, res) {
  try {
    const isLiked = await Card.findOne({
      _id: req.params.id,
      "likes.user_id": req.user._id,
    });

    if (isLiked) {
      const updatedCard = await Card.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { likes: { user_id: req.user._id } } },
        { new: true }
      ).select("-__v -bizNumber");
      if (!updatedCard) {
        sendError(res, 404, "The card with the given ID was not found");
        return;
      }
      res.send(updatedCard.likes);
      return;
    }
    const card = await Card.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { likes: { user_id: req.user._id } } },
      { new: true }
    ).select("-__v -bizNumber");
    if (!card) {
      sendError(res, 404, "The card with the given ID was not found");
      return;
    }
    res.send(card.likes);
  } catch (error) {
    if (error.path === "_id") {
      sendError(res, 404, "The card with the given ID was not found");
      return;
    }
    sendError(res, 500, `dbError: ${error.message} `);
  }
}

async function switchBizNumber(req, res) {
  try {
    const card = await Card.findOne({ _id: req.params.id });
    if (!card) {
      sendError(res, 401, "The card with the given ID was not found");
    }  
  const bizNumberCard = await Card.findOne({ bizNumber: req.body.bizNumber });
  if(bizNumberCard){
    sendError(res, 401,"The bizNumber alraedy exist try other numbers");
    return
  }
  
   await card.updateOne({bizNumber: req.body.bizNumber});
   res.send("The bizNumber updated successfully");
 
  } catch (error) {
    if (error.path === "_id") {
      sendError(res, 404, "The card with the given ID was not found");
      return;
    }

    sendError(res, 500, `dbError: ${error.message} `);
  }
}

module.exports = {
  getCard,
  getCards,
  updatedCard,
  deleteCard,
  LikeAndDisLike,
  createCard,
  switchBizNumber,
};
