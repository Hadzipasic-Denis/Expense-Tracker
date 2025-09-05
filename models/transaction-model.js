const { Schema, model } = require("mongoose");

const transactionSchema = new Schema({
  description: { type: String, required: true },
  additionalInformation: { type: String},
  type: { type: String, enum: ["income", "expense"], required: true },
  fixedExpense: {
    type: String,
    enum: ["yes", "no"],
    default: "no",
  },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  month: {
    type: String,
    enum: [
      "january",
      "february",
      "march",
      "april",
      "may",
      "june",
      "juli",
      "august",
      "september",
      "october",
      "november",
      "december",
    ],
  },
  year: { type: Number, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

const Transaction = model("Transaction", transactionSchema);

module.exports = Transaction;
