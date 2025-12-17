const express = require("express");
const verifyToken = require("../../middleware/authMiddleware")
const usersController = require("../../controllers/usersController");
const router = express.Router();
const validator = require("express-joi-validation").createValidator({});
const {
    //here
} = require("./validators");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.get(
    "/me",
    verifyToken,
    usersController.getUserSelfDetails,
);
module.exports = router;