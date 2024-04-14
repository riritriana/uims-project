import { useState } from "react";
import {
  Link,
  Navigate,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import { api } from "../api.js";

export default function Login() {
  const [login, setLogin] = useState({ email: "", password: "" }); // Deklarasi email dan password
  const navigate = useNavigate();
  const [user, setUser] = useOutletContext();

  if (user) {
    return <Navigate to="/" />;
  } else {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                // Gunakan api.post untuk melakukan permintaan
                const userData = await api.post("/auth/login", login);
                setUser(userData);
                navigate("/");
              } catch (error) {
                alert(error.message);
              }
            }}
            className="space-y-4"
          >
            <div>
              <label htmlFor="email" className="block mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                maxLength={30}
                value={login.email} // Ubah value menjadi login.email
                onChange={(e) => setLogin({ ...login, email: e.target.value })}
                className="w-full border rounded-md py-2 px-3"
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                maxLength={30}
                required
                value={login.password} // Ubah value menjadi login.password
                onChange={(e) =>
                  setLogin({ ...login, password: e.target.value })
                }
                className="w-full border rounded-md py-2 px-3"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
            >
              Login
            </button>
            <div className="text-center">
              <Link
                to="/register"
                className="text-blue-500 hover:text-blue-700"
              >
                you dont have an account?{" "}
                <span className="text-red-500">Register here</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
