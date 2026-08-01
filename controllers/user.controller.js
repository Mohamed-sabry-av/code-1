const User = require('../models/user.model')


exports.createUser = async (req, res) => {
    try {
        const body = req.body
        const createUser = await User.create(body)

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