const express = require("express")
const app = express()
const connectDb = require('./config/db.config')
const productRouter = require('./routes/products.route')
const userRouter = require("./routes/user.route")

app.use(express.json())
app.use("/product", productRouter) //  ->  /product
app.use("/user", userRouter) //  ->  /user

// product (POST)
// /product (GET)

connectDb()
app.listen(3000, () => {
    console.log("Server is running on port 3000")
})

// flow
// Model(done) -> Controllers(done) -> Routes(done) -> server.js(done)


// Flow
// DB -> Server -> Frontend