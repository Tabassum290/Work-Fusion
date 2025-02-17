import { useContext } from "react";
import logo from "../assets/logowork.png"
import { TiThMenu } from "react-icons/ti";

import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { LuLogOut } from "react-icons/lu";
import { FcAbout, FcPhone } from "react-icons/fc";
import { FaHome, FaList, FaUserCircle } from "react-icons/fa";

const CustomNavbar = () => {
  const {user,logOut} = useContext(AuthContext)
 const navigate = useNavigate();
const handleLogout = () =>{
  logOut();
  navigate('/')
}

  const links =<>
  {
    user? <>
  <NavLink to='/'><span className="text-2xl pr-2"><FaHome /></span>Home</NavLink>
  <NavLink to='/dashboard'><span className="text-2xl pr-2"><FaList /></span>Dashboard</NavLink>
  <NavLink to='/contacts'><span className="text-2xl pr-2"><FcPhone /></span>Contacts</NavLink>
  <NavLink to='/about'><span className="text-2xl pr-2"><FcAbout /></span>About Us</NavLink>
  <button onClick={handleLogout}><span className="text-2xl pr-2"><LuLogOut /></span>LogOut</button>
    </> : <>
  <NavLink to='/'>Home</NavLink>
  <NavLink to='/dashboard'>Dashboard</NavLink>
  <NavLink to='/contacts'>Contacts</NavLink>
  <NavLink to='/about'>About Us</NavLink>
  <NavLink to='/login'>Login</NavLink>
  <NavLink to='/register'>Register</NavLink>
    </> 
  }

  </>
    return (
        <div className="sticky z-10 top-0 backdrop-blur w-full bg-[#578FCA]">
<div className="max-w-7xl mx-auto">
<div className="navbar ">
  <div className="flex-1">
  <img className="w-12 h-12" src={logo} alt="" />
    <a className="btn btn-ghost text-3xl italic text-white" >Work Fusion</a>
  </div>
  <div className="flex-none">
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
      
        <div className="indicator text-2xl text-white">
        <TiThMenu />
        </div>
      </div>
      <div
        tabIndex={0}
        className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
        <div>
          <ul  tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li>
            {links}
            </li> </ul></div>
      </div>
    </div>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          {
            user? <><img
            alt={user?.displayName}
            src={user?.photoURL} /></> : <><span className="text-4xl"><FaUserCircle /></span></>
          }
          
        </div>
      </div>

    </div>
  </div>
</div>
</div>
        </div>
    );
};

export default CustomNavbar;
