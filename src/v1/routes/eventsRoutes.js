const express = require("express");
const verifyToken = require("../../middleware/authMiddleware");
const eventsController = require("../../controllers/eventsController");
const router = express.Router();
const validator = require("express-joi-validation").createValidator({});
const { idParamSchema } = require("./validators");

router.get(
  "",
  verifyToken,
  eventsController.getAllEvents,
  /* #swagger.tags = ['Events']
     #swagger.summary = 'Récupérer la liste de tous les Events'
     #swagger.security = [{ "bearerAuth": [] }] */
);

router.get(
  "/:id",
  verifyToken,
  validator.params(idParamSchema),
  eventsController.getEventById,
  /* #swagger.tags = ['Events']
     #swagger.summary = 'Récupérer un Event par son ID'
     #swagger.security = [{ "bearerAuth": [] }] */
);

module.exports = router;
