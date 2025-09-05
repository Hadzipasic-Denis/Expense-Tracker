const express = require("express");
const {
  createTransaction,
  editTransaction,
  deleteTransaction,
} = require("../controllers/transaction-controller");
const authenticate = require("../middlewares/authenticate");

const transactionRouter = express.Router();

transactionRouter.route("/newEntry").post(authenticate, createTransaction);
transactionRouter
  .route("/editTransaction/:id")
  .put(authenticate, editTransaction);
transactionRouter
  .route("/deleteTransaction/:id")
  .delete(authenticate, deleteTransaction);
module.exports = transactionRouter;
