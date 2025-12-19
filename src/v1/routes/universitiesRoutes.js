const express = require("express");
const verifyToken = require("../../middleware/authMiddleware");
const universitiesController = require("../../controllers/universitiesController");
const router = express.Router();
const validator = require("express-joi-validation").createValidator({});
const { idParamSchema } = require("./validators");

router.get(
  "",
  verifyToken,
  universitiesController.getAllUniversities,
  /* #swagger.tags = ['Universities']
     #swagger.summary = 'Récupérer la liste de tous les Universités'
     #swagger.security = [{ "bearerAuth": [] }] */
);

router.get(
  "/:id",
  verifyToken,
  validator.params(idParamSchema),
  universitiesController.getUniversityById,
  /* #swagger.tags = ['Universities']
     #swagger.summary = 'Récupérer une université par son ID'
     #swagger.security = [{ "bearerAuth": [] }] */
);

module.exports = router;
