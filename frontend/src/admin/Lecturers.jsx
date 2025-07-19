import Header from "../components/Header";
import { AllStateContext } from "../App";
import { useContext, useEffect, useState } from "react";
import { Navigate, useOutletContext } from "react-router-dom";

export default function Lecturers() {
  const { lecturer, setLecturer } = useContext(AllStateContext);
  const [formLecturer, setFormLecturer] = useState({});
  const [departement, setDepartement] = useState([]);

  const user = useOutletContext()[0];
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/university/getAllDepartement`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch departments");
        }
        return response.json();
      })
      .then((data) => {
        setDepartement(data.departements);
      })
      .catch((error) => {
        console.error("Error fetching departments:", error);
      });
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/university/getAllLecturer`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          console.error("Failed to fetch students");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data, " CHECK ");
        setLecturer(data.lecturers);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  }, [setLecturer]);

  const addLecturer = () => {
    if (formLecturer.id_lecturer) {
      fetch(`${import.meta.env.VITE_API_BASE_URL}/university/addLecturer`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formLecturer),
      })
        .then((response) => response.json())
        .then((data) => {
          setLecturer((prevLecturer) => {
            if (Array.isArray(prevLecturer) && prevLecturer.length > 0) {
              return [...prevLecturer, formLecturer];
            } else {
              return [formLecturer];
            }
          });
          setFormLecturer({});
        })
        .catch((error) => {
          console.error("Error adding lecturer:", error);
        });
    }
  };

  const fillFormLecturer = (lec) => {
    setFormLecturer(lec);
    console.log(lec);
  };
  const handleDelete = (lec) => {
    if (confirm("Are you sure you want to delete the student?")) {
      fetch(
        `${import.meta.env.VITE_API_BASE_URL}/university/deleteLecturerById/${
          lec.id_lecturer
        }`,
        {
          method: "DELETE",
          credentials: "include",
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to delete lecturer.");
          }
          setLecturer((prevLecturer) =>
            prevLecturer.filter((item) => item.id_lecturer !== lec.id_lecturer)
          );
        })
        .catch((error) => {
          console.error("Error deleting lecturer:", error);
        });
    }
  };

  if (user) {
    return (
      <div>
        <Header />
        <h1 className="text-center text-4xl text-blue-500">Lecturer Page </h1>
        <div className="flex">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className=" bg-slate-50 w-1/3 flex flex-col justify-center items-center"
          >
            <div className="w-full sm:w-2/3 md:w-4/5 lg:w-3/4 xl:w-2/3 mb-4 ">
              <label htmlFor="id">ID Lecturer</label>
              <input
                type="text"
                id="id"
                name="id"
                pattern="[a-zA-Z0-9]+"
                value={formLecturer.id_lecturer || ""}
                onChange={(e) =>
                  setFormLecturer({
                    ...formLecturer,
                    id_lecturer: e.target.value,
                  })
                }
                title="can only enter numbers and letters"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="w-full sm:w-2/3 md:w-4/5 lg:w-3/4 xl:w-2/3 mb-4 ">
              <label htmlFor="name">Name Lecturer</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formLecturer.name_lecturer || ""}
                onChange={(e) =>
                  setFormLecturer({
                    ...formLecturer,
                    name_lecturer: e.target.value,
                  })
                }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            {/* <div className="w-full sm:w-2/3 md:w-4/5 lg:w-3/4 xl:w-2/3 mb-4 ">
              <label htmlFor="salary">salary</label>
              <input
                type="text"
                id="salary"
                name="salary"
                pattern="[0-9]*"
                title="Please enter numbers only"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div> */}
            <div className="w-full sm:w-2/3 md:w-4/5 lg:w-3/4 xl:w-2/3 mb-4 ">
              <label htmlFor="departementSelect">ID Departement</label>
              <select
                name="departementSelect"
                id="id"
                value={formLecturer.departement_id || ""}
                onChange={(e) => {
                  const selectedDepartementId = e.target.value;
                  const selectedDepartement = departement.find(
                    (dep) => dep.id_departement === selectedDepartementId
                  );
                  setFormLecturer({
                    ...formLecturer,
                    departement_id: selectedDepartementId,
                    nameDepartement: selectedDepartement
                      ? selectedDepartement.name_departement
                      : "",
                  });
                }}
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Pilih Departemen</option>
                {Array.isArray(departement) &&
                  departement.map((dep) => (
                    <option key={dep.id_departement} value={dep.id_departement}>
                      {dep.id_departement}
                    </option>
                  ))}
              </select>
            </div>
            <div className="w-full sm:w-2/3 md:w-4/5 lg:w-3/4 xl:w-2/3 mb-4 ">
              <label htmlFor="nameDep">Name Departement</label>
              <input
                type="text"
                name="nameDep"
                value={formLecturer.nameDepartement}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => addLecturer()}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Add
              </button>
              <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
                Update
              </button>
              <button
                onClick={() => setFormLecturer({})}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
          <div className=" w-2/3 mx-4">
            <h1 className="text-center text-2xl"> Lecturrs Data</h1>
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="px-4 py-2 border border-gray-300">
                    ID Student
                  </th>
                  <th className="px-4 py-2 border border-gray-300">
                    Name Lecturer
                  </th>
                  <th className="px-4 py-2 border border-gray-300">NIM</th>
                  <th className="px-4 py-2 border border-gray-300">
                    ID Departement
                  </th>
                  <th className="px-4 py-2 border border-gray-300">
                    Name Departement
                  </th>
                  <th className="px-4 py-2 border border-gray-300">Action</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(lecturer) &&
                  lecturer.map((lec) => (
                    <tr key={lec.id_lecturer}>
                      <td className="px-4 py-2 border border-gray-300">
                        {lec?.id_lecturer}
                        {/* Gunakan operator ?. untuk mengakses properti */}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {lec?.name_lecturer}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {lec?.departement_id}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {lec?.nameDepartement}
                      </td>
                      <td>
                        <button onClick={() => fillFormLecturer(lec)}>
                          Update
                        </button>
                        <button onClick={() => handleDelete(lec)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  } else {
    return <Navigate to="/login" />;
  }
}
