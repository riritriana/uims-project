import Header from "../components/Header";
export default function Course() {
  return (
    <div>
      <Header />
      <h1 className="text-center text-4xl text-blue-500">Course Page </h1>
      <div className="flex">
        <form className=" bg-slate-50 w-1/3 flex flex-col justify-center items-center">
          <div className="w-full sm:w-2/3 md:w-4/5 lg:w-3/4 xl:w-2/3 mb-4 ">
            <label htmlFor="id">ID Course</label>
            <input
              type="text"
              id="id"
              name="id"
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
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="w-full sm:w-2/3 md:w-4/5 lg:w-3/4 xl:w-2/3 mb-4 ">
            <label htmlFor="lecturerSelect">ID Lecturer</label>
            <select
              name="lecturerSelect"
              id="id"
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="lect1">Lecturer 1</option>
              <option value="lect2">Lecturer 2</option>
              <option value="lect3">Lecturer 3</option>
            </select>
          </div>
          <div className="w-full sm:w-2/3 md:w-4/5 lg:w-3/4 xl:w-2/3 mb-4 ">
            <label htmlFor="nameLec">Name Lecturer</label>
            <input
              type="text"
              name="nameLec"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex justify-between">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
              Add
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
              Update
            </button>
            <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
              Delete
            </button>
          </div>
        </form>
        <div className=" w-2/3 mx-4">
          <h1 className="text-center text-2xl"> Lecturers Data</h1>
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="px-4 py-2 border border-gray-300">ID Student</th>
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
              <tr>
                <td className="px-4 py-2 border border-gray-300">1</td>
                <td className="px-4 py-2 border border-gray-300">John Doe</td>
                <td className="px-4 py-2 border border-gray-300">123456</td>
                <td className="px-4 py-2 border border-gray-300">dept1</td>
                <td className="px-4 py-2 border border-gray-300">
                  Department 1
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-gray-300">2</td>
                <td className="px-4 py-2 border border-gray-300">Jane Smith</td>
                <td className="px-4 py-2 border border-gray-300">654321</td>
                <td className="px-4 py-2 border border-gray-300">dept2</td>
                <td className="px-4 py-2 border border-gray-300">
                  Department 2
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
