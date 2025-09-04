const { Schema, model } = require("mongoose");

const goalSchema = new Schema({
  month: {
    type: String,
    enum: [
      "january",
      "february",
      "march",
      "april",
      "may",
      "june",
      "july",
      "august",
      "september",
      "october",
      "november",
      "december",
    ],
  },
  year: { type: Number, required: true },
  amount: { type: Number, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

const Goal = model("Goal", goalSchema);

module.exports = Goal;
