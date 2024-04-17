import Header from "../components/Header";
import { AllStateContext } from "../App";
import { useContext, useEffect, useState } from "react";
import { Navigate, useOutletContext } from "react-router-dom";

export default function Course() {
  const { course, setCourse } = useContext(AllStateContext);
  const [formCourse, setFormCourse] = useState({});
  const [lecturer, setLecturer] = useState([]);

  const user = useOutletContext()[0];

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
        console.log(data);
        setLecturer(data.lecturers);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  }, [setLecturer]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/university/getAllCourse`, {
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
        setCourse(data.courses);
      })
      .catch((error) => {
        console.error("Error fetching departments:", error);
      });
  }, [setCourse]);

  const addCourse = () => {
    if (formCourse.id_course) {
      fetch(`${import.meta.env.VITE_API_BASE_URL}/university/addCourse`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formCourse),
      })
        .then((response) => response.json())
        .then((data) => {
          setCourse((prevCourse) => {
            if (Array.isArray(prevCourse) && prevCourse.length > 0) {
              return [...prevCourse, formCourse];
            } else {
              return [formCourse];
            }
          });
          setFormCourse({});
        })
        .catch((error) => {
          console.error("Error adding Course:", error);
        });
    }
  };
  const updateCourse = () => {
    if (formCourse.id_course) {
      fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/university/updateDepartementById/${formCourse.id_course}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formCourse),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setCourse((prevCourse) =>
            prevCourse.map((item) =>
              item.id_student === data.course.id_course ? data.course : item
            )
          );
        })
        .catch((error) => {
          console.error("Error updating Course:", error);
        });
    }
  };
  const fillFormCourse = (co) => {
    setFormCourse(co);
    console.log(co);
  };

  const handleDelete = (co) => {
    if (confirm("Are you sure you want to delete the Course?")) {
      fetch(
        `${import.meta.env.VITE_API_BASE_URL}/university/deleteCourseById/${
          co.id_course
        }`,
        {
          method: "DELETE",
          credentials: "include",
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to delete Course.");
          }
          setCourse((prevCourse) =>
            prevCourse.filter((item) => item.id_course !== co.id_course)
          );
        })
        .catch((error) => {
          console.error("Error deleting course:", error);
        });
    }
  };

  if (user) {
    return (
      <div>
        <Header />
        <h1 className="text-center text-4xl text-blue-500">Course Page </h1>
        <div className="flex">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className=" bg-slate-50 w-1/3 flex flex-col justify-center items-center"
          >
            <div className="w-full sm:w-2/3 md:w-4/5 lg:w-3/4 xl:w-2/3 mb-4 ">
              <label htmlFor="id">ID Course</label>
              <input
                type="text"
                id="id"
                name="id"
                value={formCourse.id_course || ""}
                onChange={(e) =>
                  setFormCourse({
                    ...formCourse,
                    id_course: e.target.value,
                  })
                }
                pattern="[a-zA-Z0-9]+"
                title="can only enter numbers and letters"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="w-full sm:w-2/3 md:w-4/5 lg:w-3/4 xl:w-2/3 mb-4 ">
              <label htmlFor="name">Name Course</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formCourse.name_course || ""}
                onChange={(e) =>
                  setFormCourse({
                    ...formCourse,
                    name_course: e.target.value,
                  })
                }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="w-full sm:w-2/3 md:w-4/5 lg:w-3/4 xl:w-2/3 mb-4 ">
              <label htmlFor="lecturerSelect">ID Lecturer</label>
              <select
                name="lecturerSelect"
                id="id"
                value={formCourse.lecturer_id || ""}
                onChange={(e) => {
                  const selectedLecturerId = e.target.value;
                  const selectedLecturer = lecturer.find(
                    (lec) => lec.id_lecturer === selectedLecturerId
                  );
                  setFormCourse({
                    ...formCourse,
                    lecturer_id: selectedLecturerId,
                    nameLecturer: selectedLecturer
                      ? selectedLecturer.name_lecturer
                      : "",
                  });
                }}
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Pilih Lecturer</option>
                {Array.isArray(lecturer) &&
                  lecturer.map((lec) => (
                    <option key={lec.id_lecturer} value={lec.id_lecturer}>
                      {lec.id_lecturer}
                    </option>
                  ))}
              </select>
            </div>
            <div className="w-full sm:w-2/3 md:w-4/5 lg:w-3/4 xl:w-2/3 mb-4 ">
              <label htmlFor="nameLec">Name Lecturer</label>
              <input
                type="text"
                name="nameLec"
                value={formCourse.nameLecturer}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => addCourse()}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Add
              </button>
              <button
                onClick={() => updateCourse()}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              >
                Update
              </button>
              <button
                onClick={() => setFormCourse()}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
          <div className=" w-2/3 mx-4">
            <h1 className="text-center text-2xl"> Lecturers Data</h1>
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
                </tr>
              </thead>
              <tbody>
                {Array.isArray(course) &&
                  course.map((co) => (
                    <tr key={co.id_course}>
                      <td className="px-4 py-2 border border-gray-300">
                        {co.id_course}
                        {/* Gunakan operator ?. untuk mengakses properti */}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {co.name_course}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {co.lecturer_id}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {co.nameLecturer}
                      </td>
                      <td>
                        <button onClick={() => fillFormCourse(co)}>
                          Update
                        </button>
                        <button onClick={() => handleDelete(co)}>Delete</button>
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
