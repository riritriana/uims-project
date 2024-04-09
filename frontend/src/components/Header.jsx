import { Link } from "react-router-dom";
import {
  Home,
  School,
  User,
  UserRound,
  BookOpenText,
  CircleDollarSign,
} from "lucide-react";
import logo from "../assets/logo1.jpg";
export default function Header() {
  return (
    <header className="flex justify-between items-center shadow-lg py-4 px-6 bg-white">
      <div className="w-full flex items-center justify-between">
        <div className="flex gap-4 w-1/2">
          <img src={logo} alt="Logo" className="w-14" />
          <h1 className="text-2xl">UNIVERSITY TECHNOLOGY</h1>
        </div>
        <nav className=" flex w-1/2 ">
          <ul className="flex w-full justify-evenly">
            <li className="flex items-center gap-2 cursor-pointer">
              <Link
                to="/"
                className="text-black text-xl flex flex-col items-center"
              >
                <Home className="mb-1" />
                <span>Home</span>
              </Link>
            </li>
            <li className="flex items-center gap-2 cursor-pointer">
              <Link
                to="/departement"
                className="text-black text-xl flex flex-col items-center"
              >
                <School className="mb-1" />
                <span>Departement</span>
              </Link>
            </li>
            <li className="flex items-center gap-2 cursor-pointer">
              <Link
                to="/student"
                className="text-black text-xl flex flex-col items-center"
              >
                <User className="mb-1" />
                <span>Student</span>
              </Link>
            </li>
            <li className="flex items-center gap-2 cursor-pointer">
              <Link
                to="/lecturer"
                className="text-black text-xl flex flex-col items-center"
              >
                <UserRound className="mb-1" />
                <span>Lecturer</span>
              </Link>
            </li>
            <li className="flex items-center gap-2 cursor-pointer">
              <Link
                to="/course"
                className="text-black text-xl flex flex-col items-center"
              >
                <BookOpenText className="mb-1" />
                <span>Course</span>
              </Link>
            </li>
            <li className="flex items-center gap-2 cursor-pointer">
              <Link
                to="/fees"
                className="text-black text-xl flex flex-col items-center"
              >
                <CircleDollarSign className="mb-1" />
                <span>Fees</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
