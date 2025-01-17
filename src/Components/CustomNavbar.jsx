import logo from "../assets/logowork.png"
import { TiThMenu } from "react-icons/ti";

import { NavLink } from "react-router-dom";
const CustomNavbar = () => {
  const links =<>
  <NavLink to='/'>Home</NavLink>
  <NavLink to='/dashboard'>Dashboard</NavLink>
  <NavLink to='/contacts'>Contacts</NavLink>
  <NavLink to='/login'>Login</NavLink>
  <NavLink to='/register'>Register</NavLink>
  </>
    return (
        <div className="sticky z-10 top-0 backdrop-blur">
   <div className="navbar ">
  <div className="flex-1">
  <img className="w-12 h-12" src={logo} alt="" />
    <a className="btn btn-ghost text-3xl italic text-blue-700" >Work Fusion</a>
  </div>
  <div className="flex-none">
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
      
        <div className="indicator text-2xl">
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
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div>
        </div>
    );
};

export default CustomNavbar;
