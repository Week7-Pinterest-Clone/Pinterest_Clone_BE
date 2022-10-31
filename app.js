require("dotenv").config();
const express = require("express");
const Http = require("http");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const indexRouter = require("./routes/index.routes");
const {
  errorLogger,
  errorHandler,
} = require("./middlewares/error-handler.middleware");

const app = express();
const http = Http.createServer(app);
const port = process.env.EXPRESS_PORT || 3000;

app.use(cors());

app.use(cookieParser());
app.use(express.json());

app.use("/", indexRouter);

app.use(errorLogger); // Error Logger
app.use(errorHandler); // Error Handler

http.listen(port, () => {
  console.log(`Start listen Server: ${port}`);
});

module.exports = http;
