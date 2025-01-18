import { useQuery } from "@tanstack/react-query";
import UseAxiosSecret from "../../Hooks/UseAxiosSecret";
import Swal from "sweetalert2";
import { FcOk } from "react-icons/fc";

const AllEmployee = () => {
  const axiosSecure = UseAxiosSecret();

  // React Query hook to fetch users
  const { data: users = [],refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users")
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
      confirmButtonText: "Yes, fire!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/fire/${user._id}`)
          .then((res) => {
            console.log("Fire response:", res.data);
            refetch();
            
            Swal.fire({
              title: "Fired!",
              text: `${user.name} has been fired successfully.`,
              icon: "success"
            });
          })
          .catch((error) => {
            console.error("Error firing user:", error);
            Swal.fire({
              title: "Error",
              text: "There was an issue firing the user.",
              icon: "error"
            });
          });
      }
    });
  };
  
  

const handleMakehr = (user) =>{
    console.log("You are Hr",user._id);
    Swal.fire({
        title: "Are you sure?",
        text: `You are about to fire ${user.name}.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Make Hr!"
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure.patch(`/users/makehr/${user._id}`)
            .then((res) => {
              console.log("Fire response:", res.data);
              refetch();
              
              Swal.fire({
                title: "HR",
                text: `${user.name} has been Hr Now.`,
                icon: "success"
              });
            })
            .catch((error) => {
              console.error("Error Making Hr:", error);
              Swal.fire({
                title: "Error",
                text: "There was an issue Making the Hr.",
                icon: "error"
              });
            });
        }
      });
}

const handleAdmin = user =>{
    axiosSecure.patch(`users/admin/${user._id}`)
    .then(res => {
        console.log(res.data);
        if(res.data.modifiedCount > 0){
            Swal.fire({
                title: "Admin",
                text: `${user.name} has been Admin Now.`,
                icon: "success"
              });
        }
    }
    
    )
}



  return (
    <div className="w-full px-4 lg:px-8">
      <div className="overflow-x-auto">
        <p className="text-xl lg:text-2xl font-bold font-serif my-6 text-left">
          Employee Count: {users.length}
        </p>
        <table className="table w-full">
          {/* Table head */}
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-4">#</th>
              <th className="p-4">Name</th>
              <th className="p-4">Designation</th>
              <th className="p-4">Make HR</th>
              <th className="p-4">Fire</th>
            </tr>
          </thead>
          {/* Table body */}
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className="hover:bg-gray-100"
              >
                <th >{index + 1}</th>
                <td >
                {user.name}
                </td>
                <td >{user.designation}</td>
                <td >
                    {
                        user?.role === 'admin'? <> <p className="flex text-lg p-2 text-green-600"><span className="p-"><FcOk/></span>Admin</p></>  
                        :
                        <>    <button onClick={()=>handleAdmin(user)} className="btn btn-sm btn-primary text-white">Make Admin</button></>
                    }
              
                </td>
                {/* <td >
                    {
                        user?.isHr ? <> <p className="flex text-lg p-2 text-green-600"><span className="p-"><FcOk/></span>Hr</p></>  
                        :
                        <>    <button onClick={()=>handleMakehr(user)} className="btn btn-sm btn-primary text-white">Make HR</button></>
                    }
              
                </td> */}
                <th>
        {/* Fire button */}
        {user.isFired ? (
          <span className="text-red-500">Fired</span>
        ) : (
          <button
            className="btn btn-ghost btn-xs bg-red-500 text-white"
            onClick={() => handleFire(user)} 
          >
            Fire
          </button>
        )}
      </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllEmployee;
