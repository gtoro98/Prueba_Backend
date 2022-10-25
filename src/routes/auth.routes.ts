
import express from "express"
const controller = require("../controllers/auth.controller");

const {checkDuplicateEmails} = require("../middleware/verifySignIn")


const router = express.Router();


router.get('/LogIn', controller.logIn)
router.route('/SignIn').post(checkDuplicateEmails, controller.signIn)



module.exports = router