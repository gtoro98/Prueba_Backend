
import express from "express"
const controller = require("../controllers/user.controller");

const router = express.Router();

router.get('/users', controller.getUsers)
router.get('/users/current', controller.getCurrentUser)

module.exports = router