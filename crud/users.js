const { User } = require("../models/users");
const sendError = require("../utils/sendError");

async function getUser(req, res) {
  try {
    const user = await User.findById(req.params.id).select(
      "-password -__v -loginAttempts -blockTime -isAdmin"
    );
    if(!user){
      sendError(res, 404, "The user with the given ID was not found");
      return;
    }
    res.send(user);
  } catch (error) {
    if (error.path === "_id") {
      sendError(res, 404, "The user with the given ID was not found");
      return;
    }
    sendError(res, 500, `dbError: ${error.message} `);
  }
}

async function getUsers(req, res) {
  try {
    const users = await User.find().select(
      "-password -__v -loginAttempts -blockTime -isAdmin"
    );
    res.send(users);
  } catch (error) {
    sendError(res, 500, `dbError: ${error.message} `);
  }
}

async function getLoggedOnUser(req, res) {
  try {
    const user = await User.findById(req.user._id).select(
      "-password -__v -loginAttempts -blockTime -isAdmin"
    );
    res.send(user);
  } catch (error) {
    sendError(res, 500, `dbError: ${error.message} `);
  }
}

async function updatedUser(req, res) {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { ...req.body },
      { new: true }
    );
    if (!user) {
      sendError(res, 404, "The user with the given ID was not found");
      return;
    }
    res.send(user);
  } catch (error) {
    if (error.path === "_id") {
      sendError(res, 404, "The user with the given ID was not found");
      return;
    }
    sendError(res, 500, `dbError: ${error.message} `);
  }
}

async function deleteUser(req, res) {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.id });
      if (!user) {
        sendError(res, 404, "The user with the given ID was not found");
        return;
      }
  
    res.send("the user deleted successfully");
  } catch (error) {
    if (error.path === "_id") {
      sendError(res, 404, "The user with the given ID was not found");
      return;
    }
    sendError(res, 500, `dbError: ${error.message} `);
  }
}

async function switchBizStatus(req, res){
  try {
    const user = await User.findOne({_id:req.params.id});
    if (!user) {
      sendError(res, 404, "The user with the given ID was not found");
      return;
    }
   await user.updateOne({isBusiness:!user.isBusiness});
   res.send(
     `The business status switched from ${user.isBusiness} to ${!user.isBusiness} `
   );

  } catch (error) {
     if (error.path === "_id") {
       sendError(res, 404, "The user with the given ID was not found");
       return;
     }
     sendError(res, 500, `dbError: ${error.message} `);
    
  }
}

module.exports = {
  getUser,
  getUsers,
  getLoggedOnUser,
  updatedUser,
  deleteUser,
  switchBizStatus
};
