import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";


const ExtraSections = () => {
  const {user} = useContext(AuthContext);
    const milestones = [
        {
          title: "10+ Years in Business",
          description: "Delivering excellence in employee management for over a decade.",
          icon: "🏆",
        },
        {
          title: "50+ Awards Won",
          description: "Recognized for innovation and outstanding service across the industry.",
          icon: "🎖",
        },
        {
          title: "500+ Happy Clients",
          description: "Empowering organizations with efficient and reliable HR solutions.",
          icon: "💼",
        },
        {
          title: "1M+ Hours Managed",
          description: "Tracking workflows seamlessly for businesses of all sizes.",
          icon: "⏱",
        },
      ];
    return (
        <div>
            {/* Why Choose Us */}
            <section className="bg-gray-100 extra">
            <div className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="lg:text-5xl text-3xl font-bold text-center mb-10">Why Employers Choose Us?</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          {
            title: "Find the Best Talent Fast",
            description: "Access a global pool of skilled professionals with AI-powered job matching.",
            icon: "👨‍💼",
          },
          {
            title: "Streamlined Hiring Process",
            description: "Post jobs, filter candidates, and hire efficiently with our smart hiring system.",
            icon: "⚡",
          },
          {
            title: "Cost-Effective Recruitment",
            description: "Affordable plans, no hidden fees, and pay only for what you need.",
            icon: "💰",
          },
          {
            title: "Advanced Employee Management",
            description: "Built-in HR tools for tracking applications, onboarding, and payroll.",
            icon: "📊",
          },
          {
            title: "Secure & Trusted Platform",
            description: "Data encryption, GDPR compliance, and verified professionals.",
            icon: "🔒",
          },
          {
            title: "24/7 Dedicated Support",
            description: "Expert assistance anytime for optimizing job posts and hiring strategies.",
            icon: "📞",
          },
        ].map((item, index) => (
          <div key={index} className="bg-gray-900 p-6 rounded-lg shadow-lg text-white hover:shadow-xl transition">
            <div className="text-5xl">{item.icon}</div>
            <h3 className="text-2xl font-semibold mt-4">{item.title}</h3>
            <p className="text-gray-300 mt-2">{item.description}</p>
          </div>
        ))}
      </div>
      </div>
    </section>
{/* Achivements */}
<section className="bg-gray-900 p-8 my-8">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold text-center text-white mb-12">
          Our <span className="text-[#a5b9ed]">Achievements</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {milestones.map((milestone, index) => (
            <div
              key={index}
              className="card bg-gray-800 text-center p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 group"
            >
              <div className="text-6xl mb-4 text-red-500 group-hover:animate-bounce">
                {milestone.icon}
              </div>
              <h3 className="text-2xl font-semibold text-white mb-2 group-hover:text-yellow-300">
                {milestone.title}
              </h3>
              <p className="text-gray-400 group-hover:text-white">
                {milestone.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
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
        </div>
    );
};

export default ExtraSections;