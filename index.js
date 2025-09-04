require("dotenv/config");
require("./db.js");

const port = process.env.PORT;

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/errorHandler.js");

const userRouter = require("./routes/user-route.js");
const goalRouter = require("./routes/savingsGoal-route.js");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/goal", goalRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
