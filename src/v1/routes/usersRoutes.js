const express = require("express");
const verifyToken = require("../../middleware/authMiddleware")
const usersController = require("../../controllers/usersController");
const router = express.Router();
const validator = require("express-joi-validation").createValidator({});
const {
    updateUserSchema
} = require("./validators");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.get(
    "/me",
    verifyToken,
    usersController.getUserSelfDetails,
    /*
      #swagger.tags = ['Users']
      #swagger.summary = 'Récupérer les informations de l\'utilisateur connecté'
      #swagger.description = 'Retourne les détails du profil de l\'utilisateur authentifié'
      #swagger.security = [{ "bearerAuth": [] }]
      #swagger.responses[200] = {
        description: 'Informations utilisateur récupérées',
        content: {
          "application/json": {
            schema: { $ref: '#/components/schemas/User' }
          }
        }
      }
      #swagger.responses[401] = {
        description: 'Non authentifié',
        content: {
          "application/json": {
            schema: { $ref: '#/components/schemas/Error' }
          }
        }
      }
    */
);

router.patch(
    "/me",
    verifyToken,
    validator.body(updateUserSchema),
    usersController.updateUserDetails,
    /*
      #swagger.tags = ['Users']
      #swagger.summary = 'Mettre à jour le profil utilisateur'
      #swagger.description = 'Permet à l\'utilisateur authentifié de modifier ses informations'
      #swagger.security = [{ "bearerAuth": [] }]
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: '#/components/schemas/UserUpdate' }
          }
        }
      }
      #swagger.responses[200] = {
        description: 'Profil mis à jour avec succès',
        content: {
          "application/json": {
            schema: { $ref: '#/components/schemas/User' }
          }
        }
      }
      #swagger.responses[400] = {
        description: 'Données invalides',
        content: {
          "application/json": {
            schema: { $ref: '#/components/schemas/Error' }
          }
        }
      }
      #swagger.responses[401] = {
        description: 'Non authentifié',
        content: {
          "application/json": {
            schema: { $ref: '#/components/schemas/Error' }
          }
        }
      }
    */
)

router.get(
    "/users",
    verifyToken,
    usersController.getAllUsers,
    /*
      #swagger.tags = ['Users']
      #swagger.summary = 'Récupérer la liste de tous les utilisateurs'
      #swagger.description = 'Retourne la liste complète des utilisateurs (nécessite authentification)'
      #swagger.security = [{ "bearerAuth": [] }]
      #swagger.responses[200] = {
        description: 'Liste des utilisateurs',
        content: {
          "application/json": {
            schema: {
              type: 'array',
              items: { $ref: '#/components/schemas/User' }
            }
          }
        }
      }
      #swagger.responses[401] = {
        description: 'Non authentifié',
        content: {
          "application/json": {
            schema: { $ref: '#/components/schemas/Error' }
          }
        }
      }
    */
)

module.exports = router;