const express = require("express");
const authController = require("../../controllers/authController");
const router = express.Router();
const validator = require("express-joi-validation").createValidator({});
const { userLoginSchema, userRegisterSchema } = require("./validators");

router.post("/register", validator.body(userRegisterSchema), authController.userRegistration
  /* #swagger.tags = ['Authentication']
     #swagger.summary = 'Inscription d\'un nouvel utilisateur' */
);

router.post("/login", validator.body(userLoginSchema), authController.userConnection
  /* #swagger.tags = ['Authentication']
     #swagger.summary = 'Connexion utilisateur' */
);

module.exports = router;
