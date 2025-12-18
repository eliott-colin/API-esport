const express = require("express");
const verifyToken = require("../../middleware/authMiddleware")
const usersController = require("../../controllers/usersController");
const router = express.Router();
const validator = require("express-joi-validation").createValidator({});
const {
    updateUserSchema
} = require("./validators");

router.get("/me", verifyToken, usersController.getUserSelfDetails
  /* #swagger.tags = ['Users']
     #swagger.summary = 'Récupérer les informations de l\'utilisateur connecté'
     #swagger.security = [{ "bearerAuth": [] }] */
);

router.patch("/me", verifyToken, validator.body(updateUserSchema), usersController.updateUserDetails
  /* #swagger.tags = ['Users']
     #swagger.summary = 'Mettre à jour le profil utilisateur'
     #swagger.security = [{ "bearerAuth": [] }] */
);

router.get("/users", verifyToken, usersController.getAllUsers
  /* #swagger.tags = ['Users']
     #swagger.summary = 'Récupérer la liste de tous les utilisateurs'
     #swagger.security = [{ "bearerAuth": [] }] */
);

module.exports = router;