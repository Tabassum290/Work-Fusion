

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
            <section className="bg-gray-100 p-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Why Choose <span className="text-blue-600">WorkFusion?</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card bg-white shadow-xl p-6 text-center">
            <div className="text-5xl text-red-500 mb-4">🚀</div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Streamlined Workflow
            </h3>
            <p className="text-gray-600">
              Manage tasks, track progress, and boost team efficiency all in one place.
            </p>
          </div>
          <div className="card bg-white shadow-xl p-6 text-center">
            <div className="text-5xl text-red-500 mb-4">🔒</div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Secure Payments
            </h3>
            <p className="text-gray-600">
              Seamless salary management with advanced security protocols.
            </p>
          </div>
          <div className="card bg-white shadow-xl p-6 text-center">
            <div className="text-5xl text-red-500 mb-4">📊</div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Real-Time Insights
            </h3>
            <p className="text-gray-600">
              Get detailed performance analytics to make better decisions.
            </p>
          </div>
        </div>
      </div>
    </section>
{/* Achivements */}
<section className="bg-gray-900 p-8 my-8">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-white mb-12">
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