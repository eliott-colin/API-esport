const express = require("express");
const verifyToken = require("../../middleware/authMiddleware");
const universitiesController = require("../../controllers/universitiesController");
const router = express.Router();
const validator = require("express-joi-validation").createValidator({});
const { updateUserSchema } = require("./validators");

router.get(
  "/list",
  verifyToken,
  universitiesController.getAllUniversities,
  /* #swagger.tags = ['Universities']
     #swagger.summary = 'Récupérer la liste de tous les Universités'
     #swagger.security = [{ "bearerAuth": [] }] */
);

module.exports = router;
