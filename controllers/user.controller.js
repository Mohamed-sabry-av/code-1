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