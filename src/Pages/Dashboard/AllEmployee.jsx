import { useQuery } from "@tanstack/react-query";
import UseAxiosSecret from "../../Hooks/UseAxiosSecret";
import Swal from "sweetalert2";
import { FcOk } from "react-icons/fc";
import { useState } from "react";

const AllEmployee = () => {
  const axiosSecure = UseAxiosSecret();
  const [view, setView] = useState("table");

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleFire = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to fire ${user.name}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, fire!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/fire/${user._id}`).then((res) => {
          refetch();
          Swal.fire({
            title: "Fired!",
            text: `${user.name} has been fired successfully.`,
            icon: "success",
          });
        });
      }
    });
  };

  const handleMakeHr = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to make ${user.name} HR.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make HR!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/makehr/${user._id}`).then((res) => {
          refetch();
          Swal.fire({
            title: "HR",
            text: `${user.name} has been made HR successfully.`,
            icon: "success",
          });
        });
      }
    });
  };

  const toggleView = () => {
    setView((prevView) => (prevView === "table" ? "card" : "table"));
  };

  return (
    <div className="w-full px-4 lg:px-8">
      <div className="flex justify-between items-center my-4">
        <p className="text-xl lg:text-2xl font-bold font-serif">
          Employee Count: {users.length}
        </p>
        <button
          onClick={toggleView}
          className="btn btn-primary text-white"
        >
          Toggle to {view === "table" ? "Card View" : "Table View"}
        </button>
      </div>

      {view === "table" ? (
        <div className="overflow-x-auto mb-6">
          <table className="table w-full">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-4">#</th>
                <th className="p-4">Name</th>
                <th className="p-4">Designation</th>
                <th className="p-4">Role</th>
                <th className="p-4">Fire</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id} className="hover:bg-gray-100 hover:text-black">
                  <th>{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.designation}</td>
                  <td>
                    {user.role === "admin" ? (
                      <p className="flex text-lg p-2 text-blue-600">
                        <FcOk className="mr-2" />
                        Admin
                      </p>
                    ) : user.role === "hr" ? (
                      <p className="flex text-lg p-2 text-green-600">
                        <FcOk className="mr-2" />
                        HR
                      </p>
                    ) : (
                      <button
                        onClick={() => handleMakeHr(user)}
                        className="btn btn-sm btn-primary text-white"
                      >
                        Make HR
                      </button>
                    )}
                  </td>
                  <td>
                    {user.role === "admin" ? (
                      <span className="text-gray-500">Cannot fire Admin</span>
                    ) : user.role == 'fired' ? (
                      <span className="text-red-500">Fired</span>
                    ) : (
                      <button
                        onClick={() => handleFire(user)}
                        className="btn btn-ghost btn-xs bg-red-500 text-white"
                      >
                        Fire
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {users.map((user) => (
            <div
              key={user._id}
              className="card bg-gray-100 shadow-md p-4 border rounded-lg"
            >
              <div>
                <img
                  className="w-12 h-12 rounded-3xl"
                  src={user.image}
                  alt=""
                />
                <h3 className="text-xl font-bold text-black">{user.name}</h3>
              </div>
              <p className="text-blue-600">Designation: {user.designation}</p>
              <div className="flex justify-between mt-4">
                {user.role === "admin" ? (
                  <p className="text-blue-600 flex items-center">
                    <FcOk className="mr-2" />
                    Admin
                  </p>
                ) : user.role === "hr" ? (
                  <p className="text-green-600 flex items-center">
                    <FcOk className="mr-2" />
                    HR
                  </p>
                ) : (
                  <button
                    onClick={() => handleMakeHr(user)}
                    className="btn btn-sm btn-primary text-white"
                  >
                    Make HR
                  </button>
                )}
{user?.role === "admin" && (<span className="text-gray-800">Cannot Fire Admin</span>)}
{user?.role === "fired" ? (
  <span className="text-gray-700">Cannot Fire</span>
) : (
  <span className="text-red-600">Fire</span>
)}

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllEmployee;
