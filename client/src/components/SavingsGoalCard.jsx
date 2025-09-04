import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axiosClient from "./utils/axiosClient";
import { useState } from "react";

export default function SavingsGoalCard({ month }) {
  const [selectedYearForm, setSelectedYear] = useState(2025);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleCreate = (data) => {
    axiosClient
      .post(`/goal/newGoal`, data)
      .then(() => {
        toast.success("New goal set!");
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
        onSubmit={handleSubmit(handleCreate)}
      >
        <div className="flex flex-col">
          <label
            htmlFor="amount"
            className="mb-2 block text-sm font-medium text-[#07074D]"
          >
            Savings goal for {month}:
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
            className={`text-lg font-medium py-1 px-8 text-white bg-blue-500 rounded cursor-pointer hover:shadow-lg transition transform hover:-translate-y-0.5

      `}
          >
            {"Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
