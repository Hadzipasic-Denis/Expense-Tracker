import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthProvider";
import { toast } from "react-toastify";
import axiosClient from "./utils/axiosClient";
import Sidebar from "./Sidebar";

export default function Entry() {
  const {
    selectedMonth,
    selectedYear,
    setUserAnnualTransactions,
    setUserTransactions,
    setAllUserTransactions,
    selectedType,
    selectedCategory,
    selectedFixedExpense,
    selectedMonthEntries,
    selectedYearEntries,
  } = useContext(AuthContext);

  const [categoryType, setCategoryType] = useState("");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axiosClient
      .post("/transaction/newEntry", data)
      .then((response) => {
        return axiosClient.get("/transaction/getUserTransactions", {
          params: { month: selectedMonth, year: selectedYear },
        });
      })
      .then((response) => {
        setUserTransactions(response.data);
        return axiosClient.get("/transaction/getAnnualUserTransactions", {
          params: { year: selectedYear },
        });
      })
      .then((response) => {
        setUserAnnualTransactions(response.data);

        return axiosClient.get("/transaction/getAllUserTransactions", {
          params: {
            category: selectedCategory || undefined,
            type: selectedType || undefined,
            fixedExpense: selectedFixedExpense || undefined,
            month: selectedMonthEntries || undefined,
            year: selectedYearEntries || undefined,
          },
        });
      })
      .then((response) => {
        setAllUserTransactions(response.data);
        toast.success("Entry created!");
        navigate("/dashboard");
      })
      .catch(() => {
        toast.error("Error! Something went wrong!");
      });
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="min-h-[100vh] w-full bg-gray-50 relative overflow-y-auto">
        <div className="p-4 h-[100vh] w-full bg-gray-50 md:p-12">
          <div className="shadow rounded-lg px-4 py-8 mx-auto w-full max-w-[750px] bg-white md:px-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              New expense / income entry:
            </h1>
            <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-wrap">
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <label
                      htmlFor="type"
                      className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      Type of entry:
                    </label>
                    <select
                      {...register("type", { required: true })}
                      onChange={(e) => setCategoryType(e.target.value)}
                      name="type"
                      id="type"
                      defaultValue=""
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-3 text-base text-lg font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    >
                      <option value="" disabled>
                        -- Choose a type --
                      </option>
                      <option value={"expense"}>Expense</option>
                      <option value={"income"}>Income</option>
                    </select>
                  </div>
                </div>
                <div
                  className={
                    categoryType === ""
                      ? `hidden`
                      : `block w-full px-3 sm:w-1/2`
                  }
                >
                  <div className="mb-5">
                    <label
                      htmlFor="category"
                      className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      Category:
                    </label>
                    <select
                      {...register("category", { required: true })}
                      name="category"
                      id="category"
                      defaultValue=""
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-3 text-base text-lg font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    >
                      {categoryType === "" || categoryType !== "income" ? (
                        <>
                          <option value="" disabled>
                            -- Choose a category --
                          </option>
                          <option value={"Online shopping"}>
                            Online shopping
                          </option>
                          <option value={"Rent"}>Rent</option>
                          <option value={"Utilities"}>Utilities</option>
                          <option value={"Car Maintenance"}>
                            Car Maintenance
                          </option>
                          <option value={"Dining / Restaurants"}>
                            Dining / Restaurants
                          </option>
                          <option value={"Fuel"}>Fuel</option>
                          <option value={"Healthcare"}>Healthcare</option>
                          <option value={"Entertainment"}>Entertainment</option>
                          <option value={"Subscriptions"}>Subscriptions</option>
                          <option value={"Loan"}>Loan</option>
                          <option value={"Field trip / Vacation"}>
                            Field trip / Vacation
                          </option>
                        </>
                      ) : (
                        <>
                          <option value="Salary">Salary</option>
                          <option value="Tips">Tips</option>
                          <option value="Extra job">Extra job</option>
                          <option value="Gift / Voucher">Gift / Voucher</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap">
                <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                    <label
                      htmlFor="description"
                      className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      Description:
                    </label>
                    <input
                      {...register("description", { required: true })}
                      type="text"
                      name="description"
                      id="description"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      placeholder={
                        categoryType === ""
                          ? ` `
                          : `Describe your ${categoryType.toLowerCase()}`
                      }
                    />
                  </div>
                </div>
                <div
                  className={
                    categoryType === "expense"
                      ? `block w-full px-3 sm:w-1/2`
                      : `hidden`
                  }
                >
                  <div className="mb-5">
                    <label
                      htmlFor="fixedExpense"
                      className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      Fixed expense:
                    </label>
                    <select
                      {...register("fixedExpense", { required: true })}
                      name="fixedExpense"
                      id="fixedExpense"
                      defaultValue="no"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-3 text-base text-lg font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    >
                      <option value={"yes"}>Yes</option>
                      <option value={"no"}>No</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap">
                <div className="w-full px-3 sm:1/2">
                  <div className="mb-5">
                    <label
                      htmlFor="additionalInformation"
                      className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      Additional information:
                    </label>
                    <textarea
                      {...register("additionalInformation")}
                      name="additionalInformation"
                      id="additionalInformation"
                      rows="4"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      placeholder="Add any extra details here..."
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap">
                <div className="w-full px-3 sm:w-1/4">
                  <div className="mb-5">
                    <label
                      htmlFor="amount"
                      className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      Enter an amount:
                    </label>
                    <div className="flex gap-2">
                      <input
                        {...register("amount", { required: true })}
                        type="number"
                        min={0.01}
                        step="0.01"
                        name="amount"
                        id="amount"
                        className="w-2/3 rounded-md border border-[#e0e0e0] bg-white py-3 px-3 text-base text-lg font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        placeholder="€"
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full px-3 sm:w-1/3">
                  <div className="mb-5">
                    <label
                      htmlFor="amount"
                      className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      For the month:
                    </label>
                    <div className="flex gap-2">
                      <select
                        {...register("month", { required: true })}
                        id="month"
                        className="w-[100%] rounded-md border border-[#e0e0e0] bg-white py-4 px-3 text-sm outline-none focus:border-[#6A64F1] focus:shadow-md"
                      >
                        <option value="january">January</option>
                        <option value="february">February</option>
                        <option value="march">March</option>
                        <option value="april">April</option>
                        <option value="may">May</option>
                        <option value="june">June</option>
                        <option value="july">July</option>
                        <option value="august">August</option>
                        <option value="september">September</option>
                        <option value="october">October</option>
                        <option value="november">November</option>
                        <option value="december">December</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="w-full px-3 sm:w-1/3">
                  <div className="mb-5">
                    <label
                      htmlFor="amount"
                      className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      Of the year:
                    </label>
                    <div className="flex gap-2">
                      <select
                        {...register("year", { required: true })}
                        id="year"
                        className="w-[100%] rounded-md border border-[#e0e0e0] bg-white py-4 px-3 text-sm outline-none focus:border-[#6A64F1] focus:shadow-md"
                      >
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>

                        <option value="2027">2027</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-gradient-to-b from-gray-700 to-gray-900 text-lg font-medium py-2 px-10 mt-2 md:pd-2 text-white uppercase w-fit rounded cursor-pointer hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
