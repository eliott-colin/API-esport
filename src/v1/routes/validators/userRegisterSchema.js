const Joi = require("joi");
const userRegisterSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  photo: Joi.string().required(),
  password: Joi.string().required(),
  idUniversities: Joi.number().required(),
});

module.exports = userRegisterSchema;
