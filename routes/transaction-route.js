const express = require("express");
const {
  createTransaction,
  editTransaction,
  deleteTransaction,
  getTransactionInformation,
  getAllUserTransactions,
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
transactionRouter
  .route("/getAllUserTransactions")
  .get(authenticate, getAllUserTransactions);
transactionRouter
  .route("/getTransactionInformation/:id")
  .get(authenticate, getTransactionInformation);
module.exports = transactionRouter;
