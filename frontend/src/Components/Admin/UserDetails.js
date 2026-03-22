import React from "react";
import { FaSignOutAlt, FaTrash, FaEdit } from "react-icons/fa";

export default function UserList() {
  const users = [
    {
      name: "Darlene Robertson",
      email: "floyd123@gmail.com",
      progress: 15,
      total: 115,
      status: "Inactive",
    },
    {
      name: "Floyd Miles",
      email: "floyd123@gmail.com",
      progress: 15,
      total: 115,
      status: "Active",
    },
    {
      name: "Theresa Webb",
      email: "floyd123@gmail.com",
      progress: 15,
      total: 115,
      status: "Active",
    },
    {
      name: "Eleanor Pena",
      email: "floyd123@gmail.com",
      progress: 15,
      total: 115,
      status: "Inactive",
    },
    {
      name: "Kathryn Murphy",
      email: "floyd123@gmail.com",
      progress: 15,
      total: 115,
      status: "Active",
    },
    {
      name: "Jane Cooper",
      email: "floyd123@gmail.com",
      progress: 15,
      total: 115,
      status: "Active",
    },
    {
      name: "Savannah Nguyen",
      email: "floyd123@gmail.com",
      progress: 15,
      total: 115,
      status: "Active",
    },
    {
      name: "Wade Warren",
      email: "floyd123@gmail.com",
      progress: 15,
      total: 115,
      status: "Inactive",
    },
    {
      name: "Arlene McCoy",
      email: "floyd123@gmail.com",
      progress: 15,
      total: 115,
      status: "Active",
    },
    {
      name: "Marvin McKinney",
      email: "floyd123@gmail.com",
      progress: 15,
      total: 115,
      status: "Active",
    },
    {
      name: "Jerome Bell",
      email: "floyd123@gmail.com",
      progress: 15,
      total: 115,
      status: "Inactive",
    },
    {
      name: "Darrell Steward",
      email: "floyd123@gmail.com",
      progress: 15,
      total: 115,
      status: "Active",
    },
  ];

  return (
    <div className="flex w-[95%] mx-auto min-h-screen bg-gray-100 [font-family:'system-ui']">
      {/* Main Content */}
      <div className="flex-1 p-10">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Users List and details
        </h2>

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3">User Name</th>
                <th className="p-3">Email ID</th>
                <th className="p-3">Progress</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, idx) => (
                <tr key={idx} className="border-t">
                  <td className="p-3 flex items-center gap-2">
                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-100 text-orange-600">
                      👤
                    </span>
                    {u.name}
                  </td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3 w-60">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">
                        {u.progress} of {u.total} Done
                      </span>
                      <div className="w-32 bg-gray-200 h-2 rounded-full">
                        <div
                          className="bg-orange-400 h-2 rounded-full"
                          style={{ width: `${(u.progress / u.total) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm">
                        {((u.progress / u.total) * 100).toFixed(0)}%
                      </span>
                    </div>
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 text-sm rounded ${
                        u.status === "Active"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td className="p-3 flex gap-3">
                    <button className="text-gray-500 hover:text-blue-600 border-none">
                      <FaEdit />
                    </button>
                    <button className="text-red-500 hover:text-red-700 border-none">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-between items-center p-4 text-sm text-gray-600">
            <span>Showing 15 of 150 Users</span>
            <div className="flex gap-2">
              <button className="px-3 py-1 border rounded hover:bg-gray-100">
                &lt;
              </button>
              <button className="px-3 py-1 border rounded bg-orange-500 text-white">
                1
              </button>
              <button className="px-3 py-1 border rounded hover:bg-gray-100">
                2
              </button>
              <button className="px-3 py-1 border rounded hover:bg-gray-100">
                4
              </button>
              <button className="px-3 py-1 border rounded hover:bg-gray-100">
                5
              </button>
              <button className="px-3 py-1 border rounded hover:bg-gray-100">
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
