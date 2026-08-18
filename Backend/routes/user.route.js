const express = require('express')
const router = express.Router()
const { createUser, getUserById, getAllUsers } = require("../controllers/user.controller")
const { protect, restrectTo } = require("../middelwares/auth.middelware");

router.post("/", createUser)
router.get("/:id", getUserById)
router.get("/",protect, getAllUsers)

module.exports = router