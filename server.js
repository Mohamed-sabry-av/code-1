require("dotenv").config();

const express = require("express");
const app = express();
const connectDb = require("./config/db.config");
const productRouter = require("./routes/products.route");
const userRouter = require("./routes/user.route");
const authRouter = require("./routes/auth.route");
const cookieParser = require("cookie-parser");
const path = require("path");

// middlewares
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/product", productRouter);
app.use("/user", userRouter);
app.use("/auth", authRouter);

connectDb();

app.listen(process.env.PORT, () => {
  console.log(`Server is running via Port ${process.env.PORT}`);
});

// flow
// Model(done) -> Controllers(done) -> Routes(done) -> server.js(done)
