import Header from "../components/Header";
import { AllStateContext } from "../App";
import { useContext, useEffect, useState } from "react";
import { Navigate, useOutletContext } from "react-router-dom";

export default function Students() {
  const { student, setStudent } = useContext(AllStateContext);
  const [formStudent, setFormStudent] = useState({
    // id_student: "",
    // name_student: "",
    // nim: "",
    // departement_id: "", // pastikan semua properti state diatur dengan nilai awal
  });
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
    fetch(`${import.meta.env.VITE_API_BASE_URL}/university/getAllStudent`, {
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
        console.log(data);
        setStudent(data.students);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  }, [setStudent]);

  const addStudent = () => {
    if (formStudent.id_student) {
      fetch(`${import.meta.env.VITE_API_BASE_URL}/university/addStudent`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formStudent),
      })
        .then((response) => response.json())
        .then((data) => {
          setStudent((prevStudent) => {
            if (Array.isArray(prevStudent) && prevStudent.length > 0) {
              return [...prevStudent, formStudent];
            } else {
              return [formStudent];
            }
          });
          setFormStudent({});
        })
        .catch((error) => {
          console.error("Error adding Student:", error);
        });
    }
  };

  const updateStudent = () => {
    if (formStudent?.id_student) {
      fetch(
        `${import.meta.env.VITE_API_BASE_URL
        }/university/updateDepartementById/${formStudent?.id_student}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formStudent),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setStudent((prevStudent) =>
            prevStudent.map((item) =>
              item.id_student === data.student?.id_student ? data.student : item
            )
          );
        })
        .catch((error) => {
          console.error("Error updating student:", error);
        });
    }
  };

  const fillFormStudent = (s) => {
    console.log(s);
    // setFormStudent(s);
    const selectedDepartement = departement.find(
      (dep) => dep.id_departement === s.departement_id
    );
    setFormStudent({
      ...s,
      departement_id: s.id_departement || "",

      nameDepartement: s ? s.name_departement : "",
      // name_dekan: s ? s.name_dekan : "",
    });
  };

  const handleDelete = (s) => {
    if (confirm("Are you sure you want to delete the student?")) {
      fetch(
        `${import.meta.env.VITE_API_BASE_URL}/university/deleteStudentById/${s.id_student
        }`,
        {
          method: "DELETE",
          credentials: "include",
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to delete student.");
          }
          setStudent((prevStudent) =>
            prevStudent.filter((item) => item.id_student !== s.id_student)
          );
        })
        .catch((error) => {
          console.error("Error deleting student:", error);
        });
    }
  };

  if (user) {
    return (
      <div>
        <Header />
        <h1 className="text-center text-4xl text-blue-500">Students Page</h1>
        <div className="flex">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className=" bg-slate-50 w-1/3 flex flex-col justify-center items-center"
          >
            <div className="w-full sm:w-2/3 md:w-4/5 lg:w-3/4 xl:w-2/3 mb-4 ">
              <label htmlFor="id">ID Student</label>
              <input
                type="text"
                id="id"
                name="id"
                pattern="[a-zA-Z0-9]+"
                value={formStudent.id_student || ""}
                onChange={(e) =>
                  setFormStudent({
                    ...formStudent,
                    id_student: e.target.value,
                  })
                }
                title="can only enter numbers and letters"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="w-full sm:w-2/3 md:w-4/5 lg:w-3/4 xl:w-2/3 mb-4 ">
              <label htmlFor="name">Name Student</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formStudent.name_student || ""}
                onChange={(e) =>
                  setFormStudent({
                    ...formStudent,
                    name_student: e.target.value,
                  })
                }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="w-full sm:w-2/3 md:w-4/5 lg:w-3/4 xl:w-2/3 mb-4 ">
              <label htmlFor="nim">NIM</label>
              <input
                type="text"
                id="nim"
                name="nim"
                value={formStudent.nim || ""}
                onChange={(e) =>
                  setFormStudent({
                    ...formStudent,
                    nim: e.target.value,
                  })
                }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="w-full sm:w-2/3 md:w-4/5 lg:w-3/4 xl:w-2/3 mb-4 ">
              <label htmlFor="departementSelect">ID Departement</label>
              <select
                name="departementSelect"
                id="id"
                value={formStudent.departement_id || ""}
                defaultValue={formStudent.departement_id || ""}
                onChange={(e) => {
                  const selectedDepartementId = e.target.value;
                  const selectedDepartement = departement.find(
                    (dep) => dep.id_departement === selectedDepartementId
                  );
                  console.log(selectedDepartement, " ini ");

                  setFormStudent({
                    ...formStudent,
                    departement_id: selectedDepartementId,
                    nameDepartement: selectedDepartement
                      ? selectedDepartement.name_departement
                      : "",
                    nameDekan: selectedDepartement
                      ? selectedDepartement.name_dekan
                      : "",
                    id_departement: selectedDepartement?.id_departement || null
                  });
                }}
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Pilih Departemen</option>
                {Array.isArray(departement) &&
                  departement.map((dep, i) => (
                    <option key={dep.id_departement} value={dep.id_departement}>
                      {i + 1}. {dep.name_departement}
                    </option>
                  ))}
              </select>
            </div>
            <div className="w-full sm:w-2/3 md:w-4/5 lg:w-3/4 xl:w-2/3 mb-4 ">
              <label htmlFor="nameDep">Name Dekan</label>
              <input
                type="text"
                name="nameDep"
                value={formStudent.nameDekan}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => addStudent()}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Add
              </button>
              <button
                onClick={() => updateStudent()}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              >
                Update
              </button>
              <button
                onClick={() => setFormStudent({})}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
          <div className=" w-2/3 mx-4">
            <h1 className="text-center text-2xl"> Students Data</h1>
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="px-4 py-2 border border-gray-300">
                    ID Student
                  </th>
                  <th className="px-4 py-2 border border-gray-300">
                    Name Student
                  </th>
                  <th className="px-4 py-2 border border-gray-300">NIM</th>
                  <th className="px-4 py-2 border border-gray-300">
                    ID Departement
                  </th>
                  <th className="px-4 py-2 border border-gray-300">
                    Name Departement
                  </th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(student) &&
                  student.map((s) => (
                    <tr key={s.id_student}>
                      <td className="px-4 py-2 border border-gray-300">
                        {s?.id_student}
                        {/* Gunakan operator ?. untuk mengakses properti */}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {s?.name_student}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {s?.nim}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {s?.id_departement}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {s?.name_departement}
                      </td>
                      <td>
                        <button onClick={() => fillFormStudent(s)}>
                          Update
                        </button>
                        <button onClick={() => handleDelete(s)}>Delete</button>
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
