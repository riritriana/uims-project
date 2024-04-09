import Header from "../components/Header";

export default function Fees() {
  return (
    <div>
      <Header />
      <h1 className="text-center text-4xl text-blue-500">Fees Page</h1>
      <div className="flex">
        <form className="bg-slate-50 w-1/3 flex flex-col justify-center items-center">
          <div className="w-full sm:w-2/3 md:w-4/5 lg:w-3/4 xl:w-2/3 mb-4">
            <label htmlFor="id">ID Fees</label>
            <input
              type="text"
              id="id"
              name="id"
              pattern="[a-zA-Z0-9]+"
              title="can only enter numbers and letters"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="w-full sm:w-2/3 md:w-4/5 lg:w-3/4 xl:w-2/3 mb-4">
            <label htmlFor="id">ID Student</label>
            <input
              type="text"
              id="id"
              name="id"
              pattern="[a-zA-Z0-9]+"
              title="can only enter numbers and letters"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="w-full sm:w-2/3 md:w-4/5 lg:w-3/4 xl:w-2/3 mb-4">
            <label htmlFor="name">Name Student</label>
            <input
              type="text"
              id="name"
              name="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="w-full sm:w-2/3 md:w-4/5 lg:w-3/4 xl:w-2/3 mb-4">
            <label
              htmlFor="id"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              ID Department
            </label>
            <input
              type="text"
              id="id"
              name="id"
              pattern="[a-zA-Z0-9]+"
              placeholder="ID Department"
              title="Only letters and numbers are allowed"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="w-full sm:w-2/3 md:w-4/5 lg:w-3/4 xl:w-2/3 mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Name Department
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="w-full sm:w-2/3 md:w-4/5 lg:w-3/4 xl:w-2/3 mb-4">
            <label htmlFor="pay">Pay Amount</label>
            <input
              type="text"
              id="pay"
              name="pay"
              pattern="[0-9]+"
              title="Please enter only numbers"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="flex justify-between w-full sm:w-2/3 md:w-4/5 lg:w-3/4 xl:w-2/3 mb-4">
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
        <div className="w-2/3 mx-4">
          <h1 className="text-center text-2xl">Students Data</h1>
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="px-4 py-2 border border-gray-300">ID Fees</th>

                <th className="px-4 py-2 border border-gray-300">ID Student</th>
                <th className="px-4 py-2 border border-gray-300">
                  Name Student
                </th>
                <th className="px-4 py-2 border border-gray-300">
                  ID Department
                </th>
                <th className="px-4 py-2 border border-gray-300">
                  Name Department
                </th>
                <th className="px-4 py-2 border border-gray-300">Pay Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border border-gray-300">1</td>
                <td className="px-4 py-2 border border-gray-300">1</td>
                <td className="px-4 py-2 border border-gray-300">John Doe</td>
                <td className="px-4 py-2 border border-gray-300">dept1</td>
                <td className="px-4 py-2 border border-gray-300">
                  Department 1
                </td>
                <td className="px-4 py-2 border border-gray-300">2000000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
