const jwt = require("jsonwebtoken");
const User = require("../models/user.model")

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}
// login 
// دور على اليوزر بالايميل وبعدين قارن الباسوورد اللي موجود في الداتا بيز باللي جاي من Postman

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                status: "Failed",
                message: "Please Provide a correct email and password"
            })
        }

        const user = await User.findOne({ email })

        const token = generateToken(user._id)

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({
                status: "Failed",
                message: "Incorrect email or password"
            })
        }
        res.status(200).json({
            sucess: "success",
            data: {
                email: user.email,
                role: user.role,
                token: token
            }
        })

    } catch (err) {
        return res.status(400).json({
            message: err.message
        })
    }
}