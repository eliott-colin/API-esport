const express = require("express");
const authController = require("../../controllers/authController");
const router = express.Router();
const validator = require("express-joi-validation").createValidator({});
const { userLoginSchema, userRegisterSchema } = require("./validators");

router.post(
  "/register",
  validator.body(userRegisterSchema),
  authController.userRegistration,
  /*
    #swagger.tags = ['Authentication']
    #swagger.summary = 'Inscription d\'un nouvel utilisateur'
    #swagger.description = 'Crée un nouveau compte utilisateur avec email, username et mot de passe'
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: '#/components/schemas/UserRegister' }
        }
      }
    }
    #swagger.responses[201] = {
      description: 'Utilisateur créé avec succès',
      content: {
        "application/json": {
          schema: { $ref: '#/components/schemas/AuthResponse' }
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
    #swagger.responses[409] = {
      description: 'Email ou username déjà utilisé',
      content: {
        "application/json": {
          schema: { $ref: '#/components/schemas/Error' }
        }
      }
    }
  */
);

router.post(
  "/login",
  validator.body(userLoginSchema),
  authController.userConnection,
  /*
    #swagger.tags = ['Authentication']
    #swagger.summary = 'Connexion utilisateur'
    #swagger.description = 'Authentifie un utilisateur et retourne un token JWT'
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: '#/components/schemas/UserLogin' }
        }
      }
    }
    #swagger.responses[200] = {
      description: 'Connexion réussie',
      content: {
        "application/json": {
          schema: { $ref: '#/components/schemas/AuthResponse' }
        }
      }
    }
    #swagger.responses[401] = {
      description: 'Identifiants incorrects',
      content: {
        "application/json": {
          schema: { $ref: '#/components/schemas/Error' }
        }
      }
    }
  */
);

module.exports = router;
