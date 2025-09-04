import Sidebar from "./Sidebar";
import SavingsGoalCard from "./SavingsGoalCard";

export default function savingsGoal() {
  const months = [
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
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="min-h-[100vh] w-full bg-gray-50 relative overflow-y-auto">
        <h1 className="text-2xl font-bold text-center my-8">
          Your Yearly Savings Goals
        </h1>
        <div className="w-fit px-2 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {months.map((month) => (
            <SavingsGoalCard key={month} month={month} />
          ))}
        </div>
      </div>
    </div>
  );
}
