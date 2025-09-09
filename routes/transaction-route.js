const express = require("express");
const {
  createTransaction,
  getUserTransactions,
  getAllUserTransactions,
  getAnnualUserTransactions,
  editTransaction,
  deleteTransaction,
  getTransactionInformation,
} = require("../controllers/transaction-controller");
const authenticate = require("../middlewares/authenticate");

const transactionRouter = express.Router();

transactionRouter.route("/newEntry").post(authenticate, createTransaction);

transactionRouter
  .route("/getUserTransactions")
  .get(authenticate, getUserTransactions);
transactionRouter
  .route("/getAnnualUserTransactions")
  .get(authenticate, getAnnualUserTransactions);
transactionRouter
  .route("/getAllUserTransactions")
  .get(authenticate, getAllUserTransactions);
transactionRouter
  .route("/editTransaction/:id")
  .put(authenticate, editTransaction);
transactionRouter
  .route("/deleteTransaction/:id")
  .delete(authenticate, deleteTransaction);
transactionRouter
  .route("/getTransactionInformation/:id")
  .get(authenticate, getTransactionInformation);
module.exports = transactionRouter;
