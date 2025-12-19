const express = require("express");
const verifyToken = require("../../middleware/authMiddleware");
const teamsController = require("../../controllers/teamsController");
const router = express.Router();
const validator = require("express-joi-validation").createValidator({});
const { updateTeamSchema, idParamSchema } = require("./validators");

router.get(
  "",
  verifyToken,
  teamsController.getAllTeams,
  /* #swagger.tags = ['Teams']
     #swagger.summary = 'Récupérer la liste de tous les équipes'
     #swagger.security = [{ "bearerAuth": [] }] */
);

router.get(
  "/:id/",
  verifyToken,
  validator.params(idParamSchema),
  teamsController.getTeamById,
  /* #swagger.tags = ['Teams']
       #swagger.summary = 'Récupérer les informations d'une équipe'
       #swagger.security = [{ "bearerAuth": [] }] */
);

router.patch(
  "/:id/",
  verifyToken,
  validator.params(idParamSchema),
  validator.body(updateTeamSchema),
  teamsController.updateTeamDetails,
  /* #swagger.tags = ['Teams']
         #swagger.summary = 'Mettre à jour les informations d'une équipe'
         #swagger.security = [{ "bearerAuth": [] }] */
);

router.delete(
  "/:id/",
  verifyToken,
  validator.params(idParamSchema),
  teamsController.deleteTeam,
  /* #swagger.tags = ['Teams']
        #swagger.summary = 'Supprimer les informations d'une équipe'
        #swagger.security = [{ "bearerAuth": [] }] */
);

module.exports = router;
