const express = require("express");
const eventsController = require("../../controllers/eventsController");
const router = express.Router();
const validator = require("express-joi-validation").createValidator({});
const { idParamSchema } = require("./validators");

router.get(
  "",
  eventsController.getAllEvents,
  /* #swagger.tags = ['Events']
     #swagger.summary = 'Récupérer la liste de tous les Events'
   */
);

router.get(
  "/:id",
  validator.params(idParamSchema),
  eventsController.getEventById,
  /* #swagger.tags = ['Events']
     #swagger.summary = 'Récupérer un Event par son ID'
     #swagger.security = [{ "bearerAuth": [] }] */
);

module.exports = router;
