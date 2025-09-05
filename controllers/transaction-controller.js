const Transaction = require("../models/transaction-model");
const User = require("../models/user-model");
const asyncWrapper = require("../utils/asyncWrapper");
const ErrorResponse = require("../utils/ErrorResponse");

const createTransaction = asyncWrapper(async (req, res, next) => {
  const {
    description,
    additionalInformation,
    type,
    category,
    fixedExpense,
    amount,
    month,
    year,
  } = req.body;
  const { id } = req.user;

  const user = await User.findById(id);

  const transaction = await Transaction.create({
    description,
    additionalInformation,
    type,
    fixedExpense,
    category,
    amount,
    userId: user._id,
    month,
    year,
  });

  res.status(201).json(transaction);
});

const editTransaction = asyncWrapper(async (req, res, next) => {
  let {
    description,
    additionalInformation,
    type,
    category,
    fixedExpense,
    amount,
    month,
    year,
  } = req.body;

  const { id } = req.params;

  if (type === "income") {
    fixedExpense = "no";
  }

  const transaction = await Transaction.findByIdAndUpdate(
    id,
    {
      description,
      additionalInformation,
      type,
      fixedExpense,
      category,
      amount,
      month,
      year,
    },
    { new: true } 
  );

  if (!transaction) {
    throw new ErrorResponse("Transaction not found!", 404);
  }

  res.status(200).json(transaction);
});


const deleteTransaction = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;

  const transaction = await Transaction.findByIdAndDelete(id);

  if (!transaction) {
    throw new ErrorResponse("Transaction not found!", 404);
  }

  res.status(200).json({ message: "Transaction deleted!" });
});

module.exports = {
  createTransaction,
  editTransaction,
  deleteTransaction,
};
