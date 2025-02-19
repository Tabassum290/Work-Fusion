import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (user?.email) {
      fetch(`https://assignment-12-server-iota-steel.vercel.app/usersProfile/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setUserData(data);
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [user]);

  return (
    <div className="w-3/4 mx-auto p-8 rounded-lg shadow-lg bg-white">
      <h2 className="text-4xl font-bold text-center mb-6 text-black">Your Profile</h2>
      <div className="flex flex-col items-center">
        <img 
          src={userData?.photo || "https://via.placeholder.com/150"} 
          alt="User Avatar" 
          className="w-32 h-32 rounded-full border-4 border-gray-300 shadow-lg"
        />
        <h3 className="text-2xl font-semibold mt-4 text-black">{userData?.name || "No Name Provided"}</h3>
        <p className="text-lg text-black">{user?.email || "No Email Provided"}</p>
      </div>
      <div className="mt-6 space-y-4 bg-gray-100 p-6 rounded-lg shadow-md">
        <div className="flex border-b pb-2">
          <span className="text-gray-700 font-medium">Role:</span>
          <span className="text-gray-900 font-bold px-4">{userData?.role || "User"}</span>
        </div>
        <div className="flex border-b pb-2">
          <span className="text-gray-700 font-medium">Salary:</span>
          <span className="text-gray-900 font-bold px-4">{userData?.salary ? `$${userData.salary}` : "Not Provided"}</span>
        </div>
        <div className="flex border-b pb-2">
          <span className="text-gray-700 font-medium">Bank Account: </span>
          <span className="text-gray-900 font-bold px-4"> {userData?.bank || "Not Provided"}</span>
        </div>
        <div className="flex border-b pb-2">
          <span className="text-gray-700 font-medium">Designation:</span>
          <span className="text-gray-900 font-bold px-4">{userData?.designation || "Not Provided"}</span>
        </div>
        <div className="flex border-b pb-2">
          <span className="text-gray-700 font-medium">Joined:</span>
          <span className="text-gray-900 font-bold px-4">{user?.metadata.creationTime || "Unknown"}</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
