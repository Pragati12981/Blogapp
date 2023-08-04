const express = require("express")
const { getAllUsers, registerController, loginController } = require("../controller/userController")

// router object
const router = express.Router()

// Get All Users|| Get
router.get('/all-users',getAllUsers)

// CREATE USER || POST
router.post('/register',registerController)

// Login || Post
router.post('/login',loginController);
module.exports = router;