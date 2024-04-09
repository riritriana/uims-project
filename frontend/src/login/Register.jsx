import { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api.js";

export default function Register() {
  const [register, setRegister] = useState({ email: "", password: "" });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await api.post("/auth/register", register); // Mengirim seluruh objek register
      console.log(response); // Anda dapat menampilkan respons untuk memeriksa apakah registrasi berhasil atau tidak
    } catch (error) {
      alert("Registration failed. Please try again."); // Tangani kesalahan jika registrasi gagal
      console.error(error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Register your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={register.email} // Mengakses nilai email dari objek register
                  onChange={(e) =>
                    setRegister({ ...register, email: e.target.value })
                  } // Memperbarui nilai email dalam objek register
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={register.password} // Mengakses nilai password dari objek register
                  onChange={(e) =>
                    setRegister({ ...register, password: e.target.value })
                  } // Memperbarui nilai password dalam objek register
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Register
              </button>
            </div>
          </form>
        </div>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or{" "}
                <Link
                  to="/login"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  login
                </Link>{" "}
                to your account
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
