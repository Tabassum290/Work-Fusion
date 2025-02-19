import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomNavbar from "../../Components/CustomNavbar";
import Footer from "../../Components/Footer";

const JobOffers = () => {
  const [appliedJobs, setAppliedJobs] = useState({});

  const handleApply = (index) => {
    setAppliedJobs((prev) => ({ ...prev, [index]: true }));
    toast.success("Application Submitted Successfully!");
  };

  const jobOffers = [
    {
      title: "Software Engineer",
      description: "Develop and maintain web applications using modern technologies.",
      salary: "$70,000 - $100,000 / year",
      image: "https://i.ibb.co.com/N6FF9YTj/programming-background-with-person-working-with-codes-computer-23-2150010130.jpg",
    },
    {
      title: "Digital Marketer",
      description: "Manage and optimize digital marketing campaigns for top brands.",
      salary: "$50,000 - $80,000 / year",
      image: "https://i.ibb.co/43MFcfY/man-suit-standing.jpg",
    },
    {
      title: "UI/UX Designer",
      description: "Create user-friendly interfaces and enhance the user experience.",
      salary: "$60,000 - $90,000 / year",
      image: "https://i.ibb.co/SD73BxfZ/gradient-ui-ux.jpg",
    },
    {
      title: "HR Manager",
      description: "Oversee company hiring, training, and employee relations.",
      salary: "$55,000 - $85,000 / year",
      image: "https://i.ibb.co/HTFRzcrh/human-resources.jpg",
    },
    {
      title: "Content Writer",
      description: "Write engaging articles, blogs, and marketing content.",
      salary: "$40,000 - $65,000 / year",
      image: "https://i.ibb.co/C51qqzcg/man-studying-home.jpg",
    },
    {
      title: "Project Manager",
      description: "Lead teams and ensure project delivery within timelines.",
      salary: "$75,000 - $110,000 / year",
      image: "https://i.ibb.co/YFPvRvwD/serious-male-female.jpg",
    },
  ];

  return (
<div>
<CustomNavbar/>
<div className="max-w-7xl mx-auto px-6 py-12 ">
      <h2 className="lg:text-5xl text-3xl font-bold text-center mb-10 uppercase font-serif">
        Job Offers
      </h2>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
        {jobOffers.map((job, index) => (
          <div
            key={index}
            className="relative rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-95"
          >
            <div
              className="h-64 bg-cover bg-center relative"
              style={{ backgroundImage: `url(${job.image})` }}
            ></div>
            <div className="p-6 bg-gray-900 text-white  job">
              <h3 className="text-2xl font-semibold mb-2 para">{job.title}</h3>
              <p className="text-gray-300 para">{job.description}</p>
              <p className="text-lg font-medium mt-2 text-yellow-400">{job.salary}</p>
              <button
                className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-900 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                onClick={() => handleApply(index)}
                disabled={appliedJobs[index]}
              >
                {appliedJobs[index] ? "Applied" : "Apply Now"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
</div>

  );
};

export default JobOffers;
