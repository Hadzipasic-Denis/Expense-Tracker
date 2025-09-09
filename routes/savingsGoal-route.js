const express = require("express");
const authenticate = require("../middlewares/authenticate");
const {
  createGoal,
  getUserGoals,
  updateGoal,
  getUserFilteredGoals,
  getAnnualUserGoals,
} = require("../controllers/savingsGoal-controller");

const goalRouter = express.Router();

goalRouter.route("/newGoal").post(authenticate, createGoal);
goalRouter.route("/getUserGoals").get(authenticate, getUserGoals);
goalRouter.route("/updateGoal").put(authenticate, updateGoal);
goalRouter.route("/getUserFilteredGoals").get(authenticate, getUserFilteredGoals);
goalRouter.route("/getAnnualUserGoals").get(authenticate, getAnnualUserGoals);

module.exports = goalRouter;
