import { useState } from "react";
// import Cookie from "js-cookie";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function Login() {
  const naviget = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    // fetch(`${import.meta.env.VITE_API_BASE_URL}/auth`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     email: email,
    //     password: password,
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     Cookie.set("token", data.token);
    //     console.log(data.token);
    naviget("/admin");
    // });
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            <Link to="/register" className="text-blue-500 hover:text-blue-700">
              you dont have an account? Register here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

// export default function Login(){
//     function hadleSubmit(e){
//         e.preventDefault();
//         fetch(`${import.meta.env.VITE_API_BASE_URL}/auth`, {
//             method: "POST",
//             headers:{
//                 "Content-Type":"application/json",
//             },
//             body:JSON.stringify({
//             })
//         })
//         .then((respose)=>respose.json())
//         .then((data)=>{
//             Cookie.setItem("token", data.token);
//             console.log(data.token);
//         });
//     }
//     return(
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label htmlFor="email">Email</label>
//                     <input type="email" id="email"/>
//                 </div>
//                 <div>
//                     <label htmlFor="password">Password</label>
//                     <input type="password" id="password"/>
//                 </div>
//             </form>
//         </div>
//     )
// }
