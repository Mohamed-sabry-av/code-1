const express = require('express')
const router = express.Router()
const { createUser, getUserById, getAllUsers, updateUserRole, deleteUser } = require("../controllers/user.controller")
const { protect, restrectTo } = require("../middelwares/auth.middelware")

router.post("/", createUser)
router.get("/", protect, restrectTo("admin"), getAllUsers)
router.get("/:id", getUserById)
router.put("/:id", protect, restrectTo("admin"), updateUserRole)
router.delete("/:id", protect, restrectTo("admin"), deleteUser)

module.exports = router