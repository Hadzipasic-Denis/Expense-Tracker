import { useContext } from "react";
import { AuthContext } from "./context/AuthProvider";
import { useForm } from "react-hook-form";
import Sidebar from "./Sidebar";

export default function Register() {
  const { createAccount } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data) => {
    createAccount(data);
  };
  return (
    <div className="flex">
      <Sidebar />
      <div className="min-h-[100vh] w-full bg-gray-50 p-2">
        <section>
          <div className="flex flex-col items-center pt-24">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Create Your Account
              </h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Enter your details below to register and start using the app
              </p>
              <p className="mt-2 text-sm text-red-600 dark:text-gray-400">
                Important! The User ID should only consist of numbers!
              </p>
            </div>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div>
                    <label
                      htmlFor="userId"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      User ID:
                    </label>
                    <input
                      {...register("userId", {
                        required: "The ID must only consist of numbers!",
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "The ID must only consist of numbers!",
                        },
                      })}
                      type="text"
                      placeholder="Enter ID Number"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    {errors.userId && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.userId.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password:
                    </label>
                    <input
                      {...register("password", { required: true })}
                      type="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div className="flex justify-center">
                    <input
                      type="submit"
                      className="bg-gradient-to-b from-gray-700 to-gray-900 font-medium p-2 mt-2 md:p-2 text-white uppercase w-1/2 rounded cursor-pointer hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                      value={"Register"}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
