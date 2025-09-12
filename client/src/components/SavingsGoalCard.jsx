import { useForm } from "react-hook-form";
import { useContext, useState, useEffect, useMemo } from "react";
import { AuthContext } from "./context/AuthProvider";
import { toast } from "react-toastify";
import axiosClient from "./utils/axiosClient";

export default function SavingsGoalCard({ month }) {
  const {
    userGoals,
    selectedMonth,
    selectedYear,
    setUserGoals,
    setUserFiltererdGoals,
    setAnnualGoals,
  } = useContext(AuthContext);

  const [selectedYearForm, setSelectedYear] = useState(2025);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const existingGoal = useMemo(
    () =>
      userGoals?.find(
        (goal) =>
          goal.month === month && Number(goal.year) === Number(selectedYearForm)
      ),
    [userGoals, month, selectedYearForm]
  );

  useEffect(() => {
    if (existingGoal) {
      reset({
        amount: existingGoal.amount,
        year: existingGoal.year,
        month: existingGoal.month,
      });
    } else {
      reset({
        amount: "",
        year: selectedYearForm,
        month,
      });
    }
  }, [existingGoal, selectedYearForm, month, reset]);

  const handleCreate = (data) => {
    axiosClient
      .post(`/api//goal/newGoal`, data)
      .then(() => {
        return axiosClient.get("/api//goal/getUserFilteredGoals", {
          params: { month: selectedMonth, year: selectedYear },
        });
      })
      .then((response) => {
        setUserFiltererdGoals(response.data);

        return axiosClient.get("/api//goal/getAnnualUserGoals", {
          params: { year: selectedYear },
        });
      })
      .then((response) => {
        setAnnualGoals(response.data);

        return axiosClient.get("/api//goal/getUserGoals");
      })
      .then((response) => {
        setUserGoals(response.data);
        toast.success("New goal set!");
      })
      .catch(() => {
        toast.error("Error! Something went wrong!");
      });
  };

  const handleUpdate = (data) => {
    axiosClient
      .put(`/api//goal/updateGoal`, data)
      .then(() => {
        return axiosClient.get("/api//goal/getUserFilteredGoals", {
          params: { month: selectedMonth, year: selectedYear },
        });
      })
      .then((response) => {
        setUserFiltererdGoals(response.data);
        return axiosClient.get("/api//goal/getAnnualUserGoals", {
          params: { year: selectedYear },
        });
      })
      .then((response) => {
        setAnnualGoals(response.data);
        return axiosClient.get("/api//goal/getUserGoals");
      })
      .then((response) => {
        setUserGoals(response.data);
        toast.success("Savings goal updated!");
      })
      .catch(() => {
        toast.error("Error! Something went wrong!");
      });
  };

  const years = [2025, 2026, 2027];

  return (
    <div className="bg-white shadow-md rounded-xl p-4">
      <form
        className="mt-2"
        onSubmit={handleSubmit(existingGoal ? handleUpdate : handleCreate)}
      >
        <div className="flex flex-col">
          <label
            htmlFor="amount"
            className="mb-2 block text-sm font-medium text-[#07074D]"
          >
            Savings goal for {month.charAt(0).toUpperCase() + month.slice(1)}:
          </label>
          <div className="flex items-center gap-2">
            <input
              {...register("amount", { required: true })}
              type="number"
              min={0}
              step="0.01"
              id="amount"
              className="rounded-md border border-[#e0e0e0] bg-white py-2 px-3 text-base text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              placeholder="€"
            />
            <span>of</span>
            <div>
              <select
                {...register("year", { required: true })}
                id="year"
                value={selectedYearForm}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="rounded-md border border-[#e0e0e0] bg-white py-2 px-3 text-sm outline-none focus:border-[#6A64F1] focus:shadow-md"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <input
          {...register("month", { required: true })}
          type="hidden"
          value={month}
        />
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className={`text-lg font-medium py-1 px-8 text-white rounded cursor-pointer hover:shadow-lg transition transform hover:-translate-y-0.5
      ${
        !existingGoal
          ? "bg-gradient-to-b from-amber-400 to-yellow-700"
          : "bg-gradient-to-b from-blue-600 to-sky-700"
      }`}
          >
            {existingGoal ? "Update" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
