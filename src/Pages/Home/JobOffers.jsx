import { Link } from 'react-router-dom';

const JobOffers = () => {
  const jobOffers = [
    {
      title: 'Software Engineer',
      description: 'Develop and maintain web applications using modern technologies.',
      salary: '$70,000 - $100,000 / year',
      image: 'https://i.ibb.co.com/N6FF9YTj/programming-background-with-person-working-with-codes-computer-23-2150010130.jpg',
    },
    {
      title: 'Digital Marketer',
      description: 'Manage and optimize digital marketing campaigns for top brands.',
      salary: '$50,000 - $80,000 / year',
      image: 'https://i.ibb.co.com/43MFcfY/man-suit-standing-office-with-clipboard-pointing-poster-with-words-1098-17121.jpg',
    },
    {
      title: 'UI/UX Designer',
      description: 'Create user-friendly interfaces and enhance the user experience.',
      salary: '$60,000 - $90,000 / year',
      image: 'https://i.ibb.co.com/SD73BxfZ/gradient-ui-ux-landing-page-template-23-2149047012.jpg',
    },
    {
      title: 'HR Manager',
      description: 'Oversee company hiring, training, and employee relations.',
      salary: '$55,000 - $85,000 / year',
      image: 'https://i.ibb.co.com/HTFRzcrh/human-resources-hr-typographic-header-idea-recruitment-job-management-hr-manager-interviewing-job-ca.jpg',
    },
    {
      title: 'Content Writer',
      description: 'Write engaging articles, blogs, and marketing content.',
      salary: '$40,000 - $65,000 / year',
      image: 'https://i.ibb.co.com/C51qqzcg/man-studying-home-online-courses-free-information-by-hisself-becomes-musician-guitarist-while-isolat.jpg',
    },
    {
      title: 'Project Manager',
      description: 'Lead teams and ensure project delivery within timelines.',
      salary: '$75,000 - $110,000 / year',
      image: 'https://i.ibb.co.com/YFPvRvwD/serious-male-female-colleagues-working-with-statistic-documents-1262-12467.jpg',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-5xl font-bold text-center mb-10 uppercase font-serif ">Job Offers</h2>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
        {jobOffers.map((job, index) => (
          <div
            key={index}
            className="relative rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105"
          >
            <div
              className="h-64 bg-cover bg-center relative"
              style={{ backgroundImage: `url(${job.image})` }}
            >
            
            </div>
            <div className="p-6 bg-gray-900 text-white">
              <h3 className="text-2xl font-semibold mb-2">{job.title}</h3>
              <p className="text-gray-300">{job.description}</p>
              <p className="text-lg font-medium mt-2 text-yellow-400">{job.salary}</p>
              <Link to="/apply" className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-red-700 transition">
                Apply Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobOffers;
