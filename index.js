require("dotenv/config");
require("./db.js");

const port = process.env.PORT;
const path = require("path");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/errorHandler.js");

const userRouter = require("./routes/user-route.js");
const goalRouter = require("./routes/savingsGoal-route.js");
const transactionRouter = require("./routes/transaction-route.js");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use(express.static(path.resolve(__dirname, "client", "dist")));

app.use("/api/user", userRouter);
app.use("/api/goal", goalRouter);
app.use("/api/transaction", transactionRouter);

app.use(/(.*)/, (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
