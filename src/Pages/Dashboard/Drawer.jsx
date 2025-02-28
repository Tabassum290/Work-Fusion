import { useContext, useEffect, useState } from "react";
import { FcBullish, FcCallback, FcHome, FcOk } from "react-icons/fc";
import { LuLogOut } from "react-icons/lu";
import { TiThMenu } from "react-icons/ti";
import { Link, Outlet, useNavigate} from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { FaDollarSign, FaUser, FaUsers } from "react-icons/fa";
import UseAdmin from "../../Hooks/UseAdmin";
import UseHr from "../../Hooks/UseHr";
import { FaMessage, FaSheetPlastic } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { ImStatsDots } from "react-icons/im";
import { IoMdStats } from "react-icons/io";

const Drawer = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isAdmin] = UseAdmin();
  const [isHR] = UseHr();
  const navigate = useNavigate();

const handleLogout = () => {
    logOut();
    navigate("/");
};
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
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content flex flex-col items-center justify-center">
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary btn-sm drawer-button flex justify-end lg:hidden"
          >
            <TiThMenu />
          </label>
          <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-black text-xl min-h-full w-80 p-4">
            <h1 className="text-3xl font-bold mb-6 italic">Work Fusion</h1>
            <Link to='/dashboard/profile'>
            <div className="flex">
              <div tabIndex={0} role="button" className="btn btn-circle avatar mb-4">
                <div className="w-12 rounded-full">
                  <img alt={user.displayName} src={user.photoURL} />
                </div>
              </div>
              <h1 className="text-xl p-2 flex">{user.displayName}
                  <span
                    className="text-xl p-1"
                  >
                    {
                      userData?.isVerified ? <FcOk /> : " " 
                    }
                  </span>
              </h1>
            </div>
            </Link>
          

            {isAdmin ? (
              <>
                  <Link to="/dashboard/overview" className="flex my-4">
                  <span className="text-2xl pr-2">
                  <ImStatsDots />
                  </span>
                  <p>Overview</p>
                </Link>
                 <Link to="/dashboard/profile" className="flex my-4">
                  <span className="text-2xl pr-2">
                  <CgProfile />
                  </span>
                  <p>Profile</p>
                </Link>
                <Link to="/dashboard/allusers" className="flex my-4">
                  <span className="text-2xl pr-2">
                    <FaUsers />
                  </span>
                  <p>All Employee</p>
                </Link>
                <Link to="/dashboard/payroll" className="flex my-4">
                  <span className="text-2xl pr-2">
                    <FaDollarSign />
                  </span>
                  <p>Payroll</p>
                </Link>
                <Link to="/dashboard/message" className="flex my-4">
                  <span className="text-2xl pr-2">
                    <FaMessage/>
                  </span>
                  <p>Messages</p>
                </Link>
              </>
            ) : isHR ? (
              <>
              <Link to="/dashboard/overview" className="flex my-4">
                  <span className="text-2xl pr-2">
                  <ImStatsDots />
                  </span>
                  <p>Overview</p>
                </Link>
                 <Link to="/dashboard/profile" className="flex my-4">
                  <span className="text-2xl pr-2">
                  <CgProfile />
                  </span>
                  <p>Profile</p>
                </Link>
                <Link to="/dashboard/employee-list" className="flex my-4">
                  <span className="text-2xl pr-2">
                    <FaUsers />
                  </span>
                  <p>Employee List</p>
                </Link>
                <Link to="/dashboard/progress" className="flex my-4">
                  <span className="text-2xl pr-2">
                  <IoMdStats />

                  </span>
                  <p>Progress</p>
                </Link>
              </>
            ) : (
              <>
              <Link to="/dashboard/overview" className="flex my-4">
                  <span className="text-2xl pr-2">
                  <ImStatsDots />
                  </span>
                  <p>Overview</p>
                </Link>
                 <Link to="/dashboard/profile" className="flex my-4">
                  <span className="text-2xl pr-2">
                  <CgProfile />
                  </span>
                  <p>Profile</p>
                </Link>
                <Link to="/dashboard/worksheet" className="flex my-4">
                  <span className="text-2xl pr-2">
                  <FaSheetPlastic />
                  </span>
                  <p>Work Sheet</p>
                </Link>
                <Link to='/dashboard/paymenthistory' className="flex my-4">
                  <span className="text-2xl pr-2">
                    <FaDollarSign />
                  </span>
                  <p>Payment  History</p>
                </Link>
              </>
            )}

            <div className="border-4 my-4 border-blue-800">
              <hr />
            </div>
            <Link to="/" className="flex">
              <span className="text-2xl pr-2">
                <FcHome />
              </span>
              <p>Home</p>
            </Link>
            <Link to="/contacts" className="flex">
              <span className="text-2xl pr-2">
                <FcCallback />
              </span>
              <p>Contacts</p>
            </Link>

            <button onClick={handleLogout} className="flex">
              <span className="text-2xl pr-2">
                <LuLogOut />
              </span>
              <p>Logout</p>
            </button>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
