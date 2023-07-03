const express = require("express");
const app = express();

const cors = require("cors");
const bodyParser = require("body-parser");
const userRouter = require("./routes/user");
const questionRouter = require("./routes/question");
const commentRouter = require("./routes/comment");

require('dotenv').config();
const mongoose = require("mongoose");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(userRouter);
app.use(questionRouter);
app.use(commentRouter);

mongoose
  .connect(process.env.MONGO_CONNECT)
  .then(() => {
    console.log("CONNECTED");
  })
  .catch((err) => {
    console.log("err", err);
  });

app.listen(process.env.PORT, () => {
  console.log("Your app is alive!!!!!");
});