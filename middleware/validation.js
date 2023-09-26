module.exports = (joiSchema) => {
  return async (req, res, next) => {
    const { error } = await joiSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      const errorObj = {
          message: "Bad fields",
          fields: error.details.map((detail) => ({
           path:detail.path,
            message: detail.message,
          })),
        }
      res.statusMessage = JSON.stringify(errorObj)
      res.status(400).json({error:errorObj});
      return;
    }
    next();
  };
};
