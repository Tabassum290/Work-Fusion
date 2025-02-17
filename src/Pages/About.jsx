import { useContext } from "react";
import CustomNavbar from "../Components/CustomNavbar";
import Footer from "../Components/Footer";
import { AuthContext } from "../Provider/AuthProvider";
import { Link } from "react-router-dom";

const About = () => {
    const {user} = useContext(AuthContext);
  return (
  <div>
    <CustomNavbar/>
      <section className="bg-gray-900 text-white py-16 px-6 md:px-16 lg:px-32 text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-blue-500 mb-6">About Us</h2>
        <p className="text-lg text-gray-300 leading-relaxed">
          At <span className="text-white font-semibold">Your Website Name</span>, we believe that efficient employee
          management is the backbone of a successful organization. Our platform is designed to simplify workforce
          administration, improve productivity, and enhance collaboration between employees and management.
        </p>
        <p className="mt-4 text-lg text-gray-300 leading-relaxed">
          With powerful features such as <span className="text-white font-semibold">employee tracking, role management,
          performance monitoring, and secure authentication</span>, we provide businesses with the tools they need to
          streamline HR processes effortlessly.
        </p>
        <p className="mt-4 mb-12 text-lg text-gray-300 leading-relaxed">
          We are committed to <span className="text-white font-semibold">innovation, efficiency, and user-friendly solutions</span>,
          empowering businesses to focus on what truly matters—growth and success.
        </p>
        {
            user ? <Link to='/' className=" bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg transition duration-300">
            Get Started
          </Link > : <Link to='/login' className=" bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg transition duration-300">
          Get Started
        </Link >
        }
        
      </div>
    </section>
    <Footer/>
  </div>
  );
};

export default About;
