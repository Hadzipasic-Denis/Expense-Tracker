const express = require("express");
const authenticate = require("../middlewares/authenticate");
const {
  createGoal,
  getUserGoals,
} = require("../controllers/savingsGoal-controller");

const goalRouter = express.Router();

goalRouter.route("/newGoal").post(authenticate, createGoal);
goalRouter.route("/getUserGoals").get(authenticate, getUserGoals);

module.exports = goalRouter;
