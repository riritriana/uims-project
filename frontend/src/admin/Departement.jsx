// import { useState } from "react";
// import { Plus, PencilLine, Trash } from "lucide-react";
import Header from "../components/Header";
export default function Departement() {
  return (
    <div>
      <Header />
      <h1 className="text-center text-3xl text-blue-400 p-5">
        Departement Page
      </h1>
      <div className="flex ">
        <form className=" bg-slate-50 w-1/3 flex flex-col justify-center items-center">
          <div className="w-full sm:w-2/3 md:w-4/5 lg:w-3/4 xl:w-2/3 mb-4 ">
            <label
              htmlFor="id"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              ID Departement
            </label>
            <input
              type="text"
              id="id"
              name="id"
              pattern="[a-zA-Z0-9]+"
              placeholder="ID Departement"
              title="Hanya huruf dan angka yang diperbolehkan"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
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
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="w-full sm:w-2/3 md:w-4/5 lg:w-3/4 xl:w-2/3 mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Name Dekan
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="w-full sm:w-2/3 md:w-4/5 lg:w-3/4 xl:w-2/3 flex flex-col gap-4 items-center">
            <button className="sm:w-2/3 md:w-4/5 lg:w-3/4 xl:w-2/3 mb-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Add
            </button>
            <button className=" sm:w-2/3 md:w-4/5 lg:w-3/4 xl:w-2/3  mb-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Update
            </button>
            <button className=" sm:w-2/3 md:w-4/5 lg:w-3/4 xl:w-2/3 mb-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline">
              Delete
            </button>
          </div>
        </form>
        <div className=" w-2/3 mx-4">
          <h1 className="text-center text-4xl text-blue-500 p-3">
            Departement data
          </h1>
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">ID Department</th>
                <th className="px-4 py-2">Name Department</th>
                <th className="px-4 py-2">Name Dean</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-100">
                <td className="px-4 py-2 border border-gray-300">dept1</td>
                <td className="px-4 py-2 border border-gray-300">
                  Department 1
                </td>
                <td className="px-4 py-2 border border-gray-300">John Doe</td>
              </tr>
              <tr className="bg-gray-200">
                <td className="px-4 py-2 border border-gray-300">dept2</td>
                <td className="px-4 py-2 border border-gray-300">
                  Department 2
                </td>
                <td className="px-4 py-2 border border-gray-300">Jane Smith</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
