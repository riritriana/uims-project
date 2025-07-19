import { useContext, useState, useEffect } from "react";
import { Navigate, useOutletContext } from "react-router-dom";
import Header from "../components/Header";
import { AllStateContext } from "../App";

export default function Departement() {
  const { departement, setDepartement } = useContext(AllStateContext);
  const [formDepartement, setFormDepartement] = useState({});
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
          console.error("Failed to fetch departments");
        }
        return response.json(); // Parse JSON response
      })
      .then((data) => {
        console.log(data);
        setDepartement(data.departements);
      })
      .catch((error) => {
        console.error("Error fetching departments:", error);
      });
  }, [setDepartement]);

  const addDepartement = () => {
    if (formDepartement.id_departement) {
      fetch(`${import.meta.env.VITE_API_BASE_URL}/university/addDepartement`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDepartement),
      })
        .then((response) => response.json())
        .then((data) => {
          setDepartement((prevDepartments) => {
            if (Array.isArray(prevDepartments) && prevDepartments.length > 0) {
              return [...prevDepartments, formDepartement];
            } else {
              return [formDepartement];
            }
          });
          setFormDepartement({});
        })
        .catch((error) => {
          console.error("Error adding department:", error);
        });
    }
  };

  const updateDep = () => {
    if (formDepartement.id_departement) {
      fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/university/updateDepartementById/${formDepartement.id_departement}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formDepartement),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setDepartement((prevDepartments) =>
            prevDepartments.map((item) =>
              item.id_departement === data.departement.id_departement
                ? data.departement
                : item
            )
          );
        })
        .catch((error) => {
          console.error("Error updating department:", error);
        });
    }
  };

  const fillFormDepartement = (dep) => {
    setFormDepartement(dep);
    console.log(dep);
  };

  const handleDelete = (dep) => {
    if (confirm("Apakah Anda yakin ingin menghapus Departemen?")) {
      fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/university/deleteDepartementById/${dep.id_departement}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to delete department.");
          }
          setDepartement((prevDepartments) =>
            prevDepartments.filter(
              (item) => item.id_departement !== dep.id_departement
            )
          );
        })
        .catch((error) => {
          console.error("Error deleting department:", error);
        });
    }
  };

  if (user) {
    return (
      <div>
        <Header />
        <h1 className="text-center text-4xl text-blue-500">Departement Page</h1>
        <div className="flex flex-wrap justify-center">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addDepartement();
            }}
            className="bg-slate-50 w-full sm:w-1/3 p-6"
          >
            <div className="w-full sm:w-2/3 md:w-4/5 lg:w-3/4 xl:w-2/3 mb-4">
              <label
                htmlFor="id"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                ID Departement
              </label>
              {/* Input for ID Departement */}
              <input
                type="text"
                id="id"
                name="id"
                pattern="[a-zA-Z0-9]+"
                value={formDepartement.id_departement || ""}
                onChange={(e) =>
                  setFormDepartement({
                    ...formDepartement,
                    id_departement: e.target.value,
                  })
                }
                placeholder="ID Departement"
                title="Hanya huruf dan angka yang diperbolehkan"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            {/* Input for Name Departement */}
            <div className="w-full sm:w-2/3 md:w-4/5 lg:w-3/4 xl:w-2/3 mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Name Departement
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formDepartement.name_departement || ""}
                onChange={(e) =>
                  setFormDepartement({
                    ...formDepartement,
                    name_departement: e.target.value,
                  })
                }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            {/* Input for Name Dekan */}
            <div className="w-full sm:w-2/3 md:w-4/5 lg:w-3/4 xl:w-2/3 mb-4">
              <label
                htmlFor="dean"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Name Dekan
              </label>
              <input
                type="text"
                name="dekan"
                id="dekan"
                value={formDepartement.name_dekan || ""}
                onChange={(e) =>
                  setFormDepartement({
                    ...formDepartement,
                    name_dekan: e.target.value,
                  })
                }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="w-full sm:w-2/3 md:w-4/5 lg:w-3/4 xl:w-2/3 flex flex-col gap-4 items-center">
              <button
                onClick={() => addDepartement()}
                className="sm:w-2/3 md:w-4/5 lg:w-3/4 xl:w-2/3 mb-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Add
              </button>
              <button
                onClick={() => updateDep()}
                className="sm:w-2/3 md:w-4/5 lg:w-3/4 xl:w-2/3  mb-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Update
              </button>
              <button
                onClick={() => setFormDepartement({})}
                className="sm:w-2/3 md:w-4/5 lg:w-3/4 xl:w-2/3 mb-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
              >
                Cancel
              </button>
            </div>
          </form>
          <div className="w-full sm:w-2/3 p-6">
            <h1 className="text-center text-4xl text-blue-500 p-3">
              Department data
            </h1>
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">ID Department</th>
                  <th className="px-4 py-2">Name Department</th>
                  <th className="px-4 py-2">Name Dekan</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(departement) &&
                  departement.map((dep) => (
                    <tr key={dep.id_departement}>
                      <td className="px-4 py-2 border border-gray-300">
                        {dep.id_departement}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {dep.name_departement}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {dep.name_dekan}
                      </td>
                      <td>
                        <button onClick={() => fillFormDepartement(dep)}>
                          Update
                        </button>
                        <button onClick={() => handleDelete(dep)}>
                          delete
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
