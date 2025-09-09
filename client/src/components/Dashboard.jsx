import { NavLink } from "react-router-dom";
import { useContext, useMemo } from "react";
import { AuthContext } from "./context/AuthProvider";
import Chart from "react-apexcharts";
import Sidebar from "./Sidebar";

export default function Dashboard() {
  const {
    userTransactions,
    userAnnualGoals,
    userFilteredGoals,
    selectedMonth,
    setSelectedMonth,
    selectedYear,
    setSelectedYear,
    userAnnualTransactions,
  } = useContext(AuthContext);

  let totalIncome = 0;
  let totalExpense = 0;
  let totalAnnualGoal = 0;
  let totalAnnualIncome = 0;
  let totalAnnualExpense = 0;

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

  const years = [2025, 2026, 2027];

  userTransactions?.forEach((tx) => {
    if (tx.type === "income") {
      totalIncome += tx.amount;
    } else if (tx.type === "expense") {
      totalExpense += tx.amount;
    }
  });

  userAnnualTransactions?.forEach((tx) => {
    if (tx.type === "income") {
      totalAnnualIncome += tx.amount;
    } else if (tx.type === "expense") {
      totalAnnualExpense += tx.amount;
    }
  });

  const currentSavings = totalIncome - totalExpense;
  const currentAnnualSavings = totalAnnualIncome - totalAnnualExpense;

  const monthlyData = useMemo(() => {
    const income = [];
    const expense = [];

    months.forEach((month) => {
      const monthTx =
        userAnnualTransactions?.filter((tx) => tx.month === month) || [];
      let monthIncome = 0;
      let monthExpense = 0;

      monthTx.forEach((tx) => {
        if (tx.type === "income") monthIncome += tx.amount;
        if (tx.type === "expense") monthExpense += tx.amount;
      });

      income.push(monthIncome);
      expense.push(monthExpense);
    });

    const savings = income.map((val, i) => val - expense[i]);
    return { income, expense, savings };
  }, [userAnnualTransactions, months]);

  userAnnualGoals?.forEach((goal) => {
    totalAnnualGoal += goal.amount;
  });

  const cap = (s) =>
    typeof s === "string" && s.length
      ? s[0].toUpperCase() + s.slice(1)
      : String(s ?? "");

  const monthsDisplay = useMemo(() => months.map(cap), [months]);

  const chartOptions = {
    chart: {
      height: 300,
      type: "area",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    series: [
      { name: "Income", data: monthlyData.income },
      { name: "Expenses", data: monthlyData.expense },
      { name: "Savings", data: monthlyData.savings },
    ],
    colors: ["#22c55e", "#ef4444", "#3b82f6"],
    stroke: {
      curve: "smooth",
      width: [2, 2, 0],
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: [0.4, 0.4, 0],
        opacityTo: [0.8, 0.8, 0],
      },
    },
    legend: {
      show: true,
      customLegendItems: ["Income", "Expenses"],
    },
    xaxis: {
      categories: monthsDisplay,
      labels: {
        style: {
          colors: "#9ca3af",
          fontSize: "13px",
          fontFamily: "Inter, ui-sans-serif",
          fontWeight: 400,
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (value) =>
          `${value.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}€`,
      },
    },
    grid: { strokeDashArray: 2 },
    tooltip: {
      y: {
        formatter: (value) =>
          `${value.toLocaleString("de-DE", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}€`,
      },
    },
    dataLabels: { enabled: false },
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="min-h-[100vh] w-full bg-gray-50 relative overflow-y-auto">
        <main>
          <div className="py-2 px-4 md:py-6">
            <div className="mb-4 mt-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
                <div className="flex flex-col gap-2 md:flex-row justify-between">
                  <div className="flex-shrink-0">
                    <h3 className="mb-2 text-base font-semibold text-gray-500">
                      Savings goal for{" "}
                      {selectedMonth.charAt(0).toUpperCase() +
                        selectedMonth.slice(1) +
                        " " +
                        selectedYear}{" "}
                      :
                    </h3>
                    {!userFilteredGoals ? (
                      <>Loading</>
                    ) : userFilteredGoals.length === 0 ? (
                      <NavLink
                        to={"/savingsGoal"}
                        className="text-blue-600 hover:text-blue-800 font-semibold text-2xl rounded-lg py-2 transition duration-300 ease-in-out hover:text-emerald-500"
                      >
                        Set the goal
                      </NavLink>
                    ) : (
                      <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                        {userFilteredGoals[0]?.amount.toLocaleString("de-DE", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                        €
                      </span>
                    )}
                  </div>
                  <div className="flex-shrink-0 text-left">
                    <h3 className="mb-2 text-base font-semibold text-gray-500">
                      Savings according to goal:
                    </h3>
                    {!userFilteredGoals ? (
                      <>Loading</>
                    ) : userFilteredGoals.length === 0 ? (
                      <span className="text-2xl sm:text-3xl leading-none font-bold">
                        -
                      </span>
                    ) : (
                      <span
                        className={`text-2xl sm:text-3xl leading-none font-bold${
                          currentSavings - userFilteredGoals[0]?.amount >= 0
                            ? " text-green-500"
                            : " text-red-500"
                        }`}
                      >
                        {currentSavings - userFilteredGoals[0]?.amount >= 0
                          ? "+"
                          : ""}
                        {(
                          currentSavings - userFilteredGoals[0]?.amount
                        ).toLocaleString("de-DE", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    )}

                    <div></div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 md:flex-row justify-around bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
                <div className="flex-shrink-0 text-left">
                  <h3 className="mb-2 text-base font-semibold text-gray-500">
                    Income:
                  </h3>
                  <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                    {totalIncome.toLocaleString("de-DE", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                    €
                  </span>
                </div>
                <div className="flex-shrink-0 text-left">
                  <h3 className="mb-2 text-base font-semibold text-gray-500">
                    Expenses:
                  </h3>
                  <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                    {totalExpense.toLocaleString("de-DE", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                    €
                  </span>
                </div>
                <div className="flex-shrink-0 text-left">
                  <h3 className="mb-2 text-base font-semibold text-gray-500">
                    Savings:
                  </h3>
                  <span
                    className={`text-2xl sm:text-3xl leading-none font-bold ${
                      currentSavings >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {currentSavings.toLocaleString("de-DE", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                    €
                  </span>
                </div>
              </div>
              <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
                <div className="flex flex-col gap-2 md:flex-row  justify-between">
                  <div className="flex-shrink-0">
                    <h3 className="mb-2 text-base font-semibold text-gray-500">
                      Savings goal for {selectedYear}:
                    </h3>
                    <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                      {totalAnnualGoal.toLocaleString("de-DE", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                      €
                    </span>
                  </div>
                  <div className="flex-shrink-0 text-left">
                    <h3 className="mb-2 text-base font-semibold text-gray-500">
                      Total difference:
                    </h3>
                    <span
                      className={`text-2xl sm:text-3xl leading-none font-bold ${
                        currentAnnualSavings - totalAnnualGoal >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {currentAnnualSavings - totalAnnualGoal >= 0 ? "+" : ""}
                      {(currentAnnualSavings - totalAnnualGoal).toLocaleString(
                        "de-DE",
                        {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }
                      )}
                      €
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
              <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8  2xl:col-span-2">
                <div className="flex items-center justify-end gap-2 mb-4">
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="rounded-md border border-gray-300 bg-white py-2 px-3 text-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
                  >
                    {months.map((month) => (
                      <option key={month} value={month}>
                        {month.charAt(0).toUpperCase() + month.slice(1)}
                      </option>
                    ))}
                  </select>

                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(Number(e.target.value))}
                    className="rounded-md border border-gray-300 bg-white py-2 px-3 text-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
                  >
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="overflow-x-auto">
                  <div className="min-w-[1000px] md:min-w-full">
                    {" "}
                    <Chart
                      options={chartOptions}
                      series={chartOptions.series}
                      type="area"
                      height={450}
                    />
                  </div>
                </div>
              </div>
              <div className="overflow-x-scroll">
                <div className="bg-white min-w-fit shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Monthly overview for {selectedYear}:
                      </h3>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="overflow-x-auto rounded-lg">
                      <div className="align-middle inline-block w-full">
                        <div className="shadow overflow-hidden sm:rounded-lg">
                          <table className="w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Month
                                </th>
                                <th className="p-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Income
                                </th>
                                <th className="p-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Expense
                                </th>
                                <th className="p-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Savings
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {months.map((month) => {
                                const monthTransactions =
                                  userAnnualTransactions?.filter(
                                    (tx) => tx.month === month
                                  ) || [];

                                let income = 0;
                                let expense = 0;
                                monthTransactions.forEach((tx) => {
                                  if (tx.type === "income") income += tx.amount;
                                  if (tx.type === "expense")
                                    expense += tx.amount;
                                });

                                const savings = income - expense;

                                return (
                                  <tr key={month}>
                                    <td className="px-4 py-2 whitespace-nowrap text-sm font-semibold text-gray-500">
                                      {month.charAt(0).toUpperCase() +
                                        month.slice(1)}
                                    </td>
                                    <td className="px-4 py-2 text-center whitespace-nowrap text-sm font-semibold text-gray-900">
                                      {income.toLocaleString("de-DE", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                      })}
                                      €
                                    </td>
                                    <td className="px-4 py-2 text-center whitespace-nowrap text-sm font-semibold text-gray-500">
                                      {expense.toLocaleString("de-DE", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                      })}
                                      €
                                    </td>
                                    <td
                                      className={`px-4 py-2 text-center whitespace-nowrap text-sm font-semibold ${
                                        savings >= 0
                                          ? "text-green-600"
                                          : "text-red-600"
                                      }`}
                                    >
                                      {savings.toLocaleString("de-DE", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                      })}
                                      €
                                    </td>
                                  </tr>
                                );
                              })}
                              <tr>
                                <td className="px-4 py-2 whitespace-nowrap text-sm font-semibold text-gray-500">
                                  Total
                                </td>
                                <td className="px-4 py-2 text-center whitespace-nowrap text-sm font-semibold text-gray-900">
                                  {totalAnnualIncome.toLocaleString("de-DE", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  })}
                                  €
                                </td>
                                <td className="px-4 py-2 text-center whitespace-nowrap text-sm font-semibold text-gray-500">
                                  {totalAnnualExpense.toLocaleString("de-DE", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  })}
                                  €
                                </td>
                                <td
                                  className={`px-4 py-2 text-center whitespace-nowrap text-sm font-semibold ${
                                    currentAnnualSavings >= 0
                                      ? "text-green-600"
                                      : "text-red-600"
                                  }`}
                                >
                                  {currentAnnualSavings.toLocaleString(
                                    "de-DE",
                                    {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    }
                                  )}
                                  €
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
