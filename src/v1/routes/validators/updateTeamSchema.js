const Joi = require("joi");
const updateTeamSchema = Joi.object({
  name: Joi.string().required(),
});

module.exports = updateTeamSchema;
