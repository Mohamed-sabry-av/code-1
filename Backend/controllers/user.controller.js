const User = require('../models/user.model')
const bcrypt = require('bcryptjs')

exports.createUser = async (req, res) => {
    try {
        let { email, password, role } = req.body

        const salt = await bcrypt.genSalt(10)
        password = await bcrypt.hash(password, salt) // 123456 -> xyuiojvyugeawr623yugquw  

        const createUser = await User.create({
            email,
            password,
            role
        }) //create 

        res.status(201).json({
            status: "sucess",
            data: createUser
        })
    } catch (err) {
        res.status(406).json({
            message: "Failed to create a User",
            ErrMessage: err.message
        })
    }

}

exports.getUserById = async (req, res) => {
    try {
        const id = req.params.id
        const getUser = await User.findById(id)

        res.status(200).json({
            status: "sucess",
            data: getUser
        })
    } catch (err) {
        res.status(406).json({
            message: "Failed to get a User",
            ErrMessage: err.message
        })
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password -refreshToken")

        res.status(200).json({
            status: "sucess",
            users
        })
    } catch (err) {
        res.status(406).json({
            message: "Failed to get users",
            ErrMessage: err.message
        })
    }
}

exports.updateUserRole = async (req, res) => {
    try {
        const id = req.params.id
        const { role } = req.body

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { role },
            { new: true, runValidators: true }
        ).select("-password -refreshToken")

        res.status(200).json({
            status: "sucess",
            data: updatedUser
        })
    } catch (err) {
        res.status(406).json({
            message: "Failed to update user",
            ErrMessage: err.message
        })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const id = req.params.id
        const deletedUser = await User.findByIdAndDelete(id)

        res.status(200).json({
            status: "sucess",
            data: deletedUser
        })
    } catch (err) {
        res.status(406).json({
            message: "Failed to delete user",
            ErrMessage: err.message
        })
    }
}