require("dotenv").config()

const express = require("express")
const app = express()
const connectDb = require('./config/db.config')
const productRouter = require('./routes/products.route')
const userRouter = require("./routes/user.route")
const authRouter = require("./routes/auth.route")

app.use(express.json())
app.use("/product", productRouter) //  ->  /product
app.use("/user", userRouter) //  ->  /user
app.use("/auth", authRouter) //  ->  /user


// product (POST)
// /product (GET)

connectDb()

app.listen(process.env.PORT, () => {
    console.log(`Server is running via Port ${process.env.PORT}`)
})

// flow
// Model(done) -> Controllers(done) -> Routes(done) -> server.js(done)


