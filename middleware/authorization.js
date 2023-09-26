const {Card} = require('../models/cards');
module.exports = (...authorizations) => {
    return async (req, res, next) => {
       if (authorizations.length) {
         if (
           ((!authorizations.includes("acountOwner") ||
             req.user._id != req.params.id) && 
             (!authorizations.includes("cardOwner") ||
              !await isCardOwner(req)
            ))
         ) {
           let authorizationsCounter = 0;
           authorizations
             .filter((authorization) => !["acountOwner", "cardOwner"].includes(authorization))
             .forEach((authorization) => {
               if (req.user[authorization]) {
                 authorizationsCounter++;
               }
             });

           if (!authorizationsCounter) {
             res
               .status(401)
               .send("There is no authorization for this type of account");
             return;
           }
         }
       }
       next();
    }
}

const isCardOwner = async (req) => {
   try {
   const card = await Card.findOne({ _id: req.params.id,  user_id: req.user._id });
   if(!card){
    return false;
   }
    return true;
   } catch (error) {
      return false;    
   }
}