
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import { LuLogOut } from "react-icons/lu";
import { TiThMenu } from "react-icons/ti";
import { FcBearish, FcCallback, FcHome } from "react-icons/fc";
const Dashboard = () => {

    return (
        <div>
<div className="drawer lg:drawer-open">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col items-center justify-center">
    {/* Page content here */}
  
        
<label htmlFor="my-drawer-2" className="btn btn-primary btn-sm drawer-button flex justify-end lg:hidden">
<TiThMenu />
</label>
  </div>
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu bg-base-200 text-xl min-h-full w-80 p-4">
      {/* Sidebar content here */}
      <div tabIndex={0} role="button" className="btn btn-circle avatar mb-4">
        <div className="w-12 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <Link to='/contacts' className="flex"><span className="text-2xl pr-2"><FcBearish /></span><p>Dashboard</p></Link>
      <div className="border-4 my-4 border-blue-800"><hr></hr></div>
      <Link to='/' className="flex"><span className="text-2xl pr-2"><FcHome /></span><p>Home</p></Link>
      <Link to='/contacts' className="flex"><span className="text-2xl pr-2"><FcCallback /></span><p>Contacts</p></Link>

      <button  className="flex"><span className="text-2xl pr-2"><LuLogOut /></span><p>Logout</p></button>
    </ul>
  </div>
</div>


<main>

</main>
<Footer/>



        </div>
    );
};

export default Dashboard;