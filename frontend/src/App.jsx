import { Outlet } from "react-router-dom";
// import Header from "./components/Header";
import { useState } from "react";
import { createContext } from "react";
import { useEffect } from "react";
import { api } from "./api.js";

export const AllStateContext = createContext();
function App() {
  const [departement, setDepartement] = useState([]);
  const [formDepartement, setFormDepartement] = useState({});

  const [student, setStudent] = useState([]);
  const [dosen, setDosen] = useState([]);
  const [course, setCourse] = useState([]);
  const [learning, setLearning] = useState([]);
  const [lecturer, setLecturer] = useState([]);

  const [countDepartement, setCountDepartement] = useState([]);
  const [countStudent, setCountStudent] = useState([]);
  const [countDosen, setCountDosen] = useState([]);

  const [user, setUser] = useState();

  useEffect(() => {
    api
      .get("/university/me")
      .then((me) => {
        if (!me) {
          console.log(me);
          setUser(null);
        } else {
          setUser(me);
        }
      })
      .catch((eror) => {
        console.log(eror);
      });
  }, [user?.id]);
  return (
    <AllStateContext.Provider
      value={{
        departement,
        setDepartement,
        student,
        setStudent,
        formDepartement,
        setFormDepartement,
        dosen,
        setDosen,
        course,
        setCourse,
        learning,
        setLearning,
        countStudent,
        setCountStudent,
        countDepartement,
        setCountDepartement,
        countStudent,
        setCountStudent,
        countDosen,
        setCountDosen,
        lecturer, 
        setLecturer
      }}
    >
      <Outlet context={[user, setUser]} />
    </AllStateContext.Provider>
    // <div>
    //   <Header />
    //   <Outlet />
    // </div>
  );
}

export default App;
