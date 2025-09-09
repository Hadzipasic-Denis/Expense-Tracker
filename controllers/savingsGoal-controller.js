const Goal = require("../models/savingsGoal-model");
const User = require("../models/user-model");
const ErrorResponse = require("../utils/ErrorResponse");
const asyncWrapper = require("../utils/asyncWrapper");

const createGoal = asyncWrapper(async (req, res, next) => {
  const { month, amount, year } = req.body;
  const { id } = req.user;

  const user = await User.findById(id);
  if (!user) {
    throw new ErrorResponse("User not found!", 404)
  }

  const existingGoal = await Goal.findOne({
    userId: user._id,
    year: Number(year),
    month,
  });

  if (existingGoal) {
        throw new ErrorResponse("Savings goal already set for the chosen month and year!", 409)
  }

  const goal = await Goal.create({
    month,
    amount,
    year: Number(year),
    userId: user._id,
  });

  res.status(201).json(goal);
});

const updateGoal = asyncWrapper(async (req, res, next) => {
  const { month, amount, year } = req.body;
  const { id } = req.user;

  const user = await User.findById(id);
  if (!user) {
    throw new ErrorResponse("User not found!", 404);
  }

  const goal = await Goal.findOneAndUpdate(
    {
      userId: user._id,
      year: Number(year),
      month,
    },
    { amount }, 
    { new: true } 
  );

  if (!goal) {
    throw new ErrorResponse("Savings goal not found!", 404);
  }

  res.status(200).json(goal);
});

const getUserGoals = asyncWrapper(async (req, res, next) => {
  const { id } = req.user;

  const goal = await Goal.find({ userId: id });

  res.status(200).json(goal);
});

const getUserFilteredGoals = asyncWrapper(async (req, res, next) => {
  const { id } = req.user;
  const { month, year } = req.query;

  const filter = { userId: id };

  if (month) filter.month = month.toLowerCase();
  if (year) filter.year = Number(year);

  const goal = await Goal.find(filter);

  res.status(200).json(goal);
});

const getAnnualUserGoals = asyncWrapper(async (req, res, next) => {
  const { id } = req.user;
  const { year } = req.query;

  const filter = { userId: id };

  if (year) filter.year = Number(year);

  const goal = await Goal.find(filter);

  res.status(200).json(goal);
});


module.exports = {
  createGoal,
  getUserGoals,
  updateGoal,
  getUserFilteredGoals,
  getAnnualUserGoals
};
