const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const userController = require("../controllers/userController");

const router = express.Router();

router.use(authMiddleware);

router.get("/users", userController.getUsers);


module.exports = router;
