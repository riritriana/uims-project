// import { useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  School,
  User,
  UserRound,
  BookOpenText,
  CircleDollarSign,
} from "lucide-react";
import foto from "../../public/logo.jpg";
// import { AllStateContext } from "../App";
// import { api } from "../api";

export default function HomepageAdmin() {
  const user = useOutletContext()[0];
  // const { setCountStudent, setCountDepartement}

  if (user) {
    return (
      <>
        <Header />
        <div>
          <h1 className="text-center text-4xl text-blue-800 font-bold p-3">
            Welcome to Admin Home Page
          </h1>
          <h2 className="text-center text-3xl text-blue-500 font-bold p-3">
            University Information Manajement System
          </h2>
          <h2 className="text-center text-3xl text-red-500 font-bold ">
            (UIMS)
          </h2>
        </div>
        <div>
          <div>
            <div>
              <div>
                <School />
                <span>Departement</span>
              </div>
              <p>1</p>
            </div>
            <div>
              <div>
                <User />
                <span>Student</span>
              </div>
              <p>1</p>
            </div>
            <div>
              <div>
                <UserRound />
                <span>Lecturer</span>
              </div>
              <p>1</p>
            </div>
            <div>
              <div>
                <BookOpenText />
                <span>Course</span>
              </div>
              <p>1</p>
            </div>
            <div>
              <div>
                <CircleDollarSign />
                <span>Fees</span>
              </div>
              <p>2000000</p>
            </div>
            {/* <div className="absolute inset-0 z-0">
              <img src={foto} alt="bg" className="object-cover w-full h-full" />
            </div> */}
          </div>
        </div>
        <Footer />
      </>
    );
  } else {
    return <Navigate to="/login" />;
  }
}
