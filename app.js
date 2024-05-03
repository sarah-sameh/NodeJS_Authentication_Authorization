const express = require("express");
const morgan = require("morgan");


const tasksRouter = require("./routes/tasksRouter");
const usersRouter = require("./routes/usersRouter");
const authRouter = require("./routes/authRouter");
const globalErrorHandler = require("./middlewares/errorHandler");
const CustomeAPIError = require("./utilities/errors/CustomeAPIError");
const checkRole = require("./middlewares/checkRole");
const protect = require("./middlewares/protect");

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => res.send("Hello World!"));

app.use("/api/v1/tasks", tasksRouter);
app.use(
  "/api/v1/users",
  protect ,
  checkRole("admin") ,
  usersRouter
);
app.use("/api/v1/auth", authRouter);


app.use(globalErrorHandler);

module.exports = app;


