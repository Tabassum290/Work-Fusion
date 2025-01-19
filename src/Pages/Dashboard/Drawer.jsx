import { useContext } from "react";
import {  FcCallback, FcHome } from "react-icons/fc";
import { LuLogOut } from "react-icons/lu";
import { TiThMenu } from "react-icons/ti";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { FaDollarSign, FaUsers } from "react-icons/fa";
import UseAdmin from "../../Hooks/UseAdmin";

const Drawer = () => {
  const {user,logOut} = useContext(AuthContext);
  const [isAdmin] = UseAdmin();
   const navigate = useNavigate();
const handleLogout = () =>{
logOut();
navigate('/')
}

    return (
        <div>
            <div className="drawer lg:drawer-open">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

  <div className="drawer-content flex flex-col items-center justify-center">
    {/* Page content here */}
    <label htmlFor="my-drawer-2" className="btn btn-primary btn-sm drawer-button flex justify-end lg:hidden">
<TiThMenu />
</label>
  <Outlet></Outlet>
        

  </div>
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu bg-base-200 text-xl min-h-full w-80 p-4">
      
      {/* Sidebar content here */}
<h1 className="text-3xl font-bold mb-6 italic"> Work Fusion</h1>
      <div className="flex">
      <div tabIndex={0} role="button" className="btn btn-circle avatar mb-4">
        <div className="w-12 rounded-full">
          <img
            alt={user.displayName}
            src={user.photoURL} />
        </div>
   
      </div>
      <h1 className="text-xl p-2">{user.displayName}</h1>
      </div>
    {
      isAdmin ? <>
         <Link to='/dashboard/allusers' className="flex my-4"><span className="text-2xl pr-2"><FaUsers /></span><p>All Employee</p></Link>
         <Link to='/dashboard/payroll' className="flex my-4"><span className="text-2xl pr-2"><FaDollarSign /></span><p>PayRoll</p></Link>
      </> : <>
      <Link to='/dashboard/allusers' className="flex my-4"><span className="text-2xl pr-2"><FaUsers /></span>
      <p>WorkShit</p></Link>
         <Link to='/dashboard/payroll' className="flex my-4"><span className="text-2xl pr-2"><FaDollarSign /></span>
         <p>Payment History</p></Link>
      </>
    }
 <Link to='/dashboard/allusers' className="flex my-4"><span className="text-2xl pr-2"><FaUsers /></span><p>All Employee</p></Link>
 <Link to='/dashboard/payroll' className="flex my-4"><span className="text-2xl pr-2"><FaDollarSign /></span><p>PayRoll</p></Link>
   

{/* Shared */}

      <div className="border-4 my-4 border-blue-800"><hr></hr></div>
      <Link to='/' className="flex"><span className="text-2xl pr-2"><FcHome /></span><p>Home</p></Link>
      <Link to='/contacts' className="flex"><span className="text-2xl pr-2"><FcCallback /></span><p>Contacts</p></Link>

      <button onClick={handleLogout}  className="flex"><span className="text-2xl pr-2"><LuLogOut /></span><p>Logout</p></button>
    </ul>
  </div>
</div>
        </div>
    );
};

export default Drawer;