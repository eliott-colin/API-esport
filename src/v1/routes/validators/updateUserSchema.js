const Joi = require("joi");
const updateUserSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
});

module.exports = updateUserSchema;
