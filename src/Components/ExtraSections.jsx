

const ExtraSections = () => {
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
            <section className="bg-gray-100">
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

        </div>
    );
};

export default ExtraSections;