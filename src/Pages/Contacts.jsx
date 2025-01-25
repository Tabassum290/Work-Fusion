import React from 'react';
import CustomNavbar from '../Components/CustomNavbar';
import Footer from '../Components/Footer';
import { FaFacebook, FaLinkedin } from 'react-icons/fa';
import { IoLogoTwitter } from 'react-icons/io';
import UseAxiosPublic from '../Hooks/UseAxiosPublic';
import { useNavigate } from 'react-router-dom';

const Contacts = () => {
  const axiosPublic = UseAxiosPublic()
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const message = e.target.message.value;
  
    const info = {
      name: name,
      email: email,
      message: message,
    };
    try {
      const res = await axiosPublic.post('/contact', info);
      navigate('/')
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  
    return (
        <div>
            <CustomNavbar/>
            <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Get in <span className="text-blue-600">Touch</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              Send Us a Message
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name='name'
                  placeholder="Enter your name"
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name='email'
                  placeholder="Enter your email"
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Message
                </label>
                <textarea
                  placeholder="Write your message here"
                  name='message'
                  className="textarea textarea-bordered w-full"
                  rows="5"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn btn-primary bg-blue-600 hover:bg-blue-900 w-full text-white"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col justify-center space-y-8">
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                Office Address
              </h4>
              <p className="text-gray-600">
                WorkFusion HQ, <br />
               Mirpur,Dhaka.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                Phone
              </h4>
              <p className="text-gray-600">0157123-4567</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                Email
              </h4>
              <p className="text-gray-600">workfusion@gmail.com</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                Follow Us
              </h4>
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/"
                  className="text-gray-600 hover:text-blue-500 transition text-2xl"
                  aria-label="Facebook"
                >
                 <FaFacebook/>
                </a>
                <a
                  href="https://x.com/?lang=en"
                  className="text-gray-600 hover:text-blue-600 transition text-2xl"
                  aria-label="Twitter"
                >
                   
                   <IoLogoTwitter />
                </a>
                <a
                  href="https://www.linkedin.com/"
                  className="text-gray-600 hover:text-blue-600 transition text-2xl"
                  aria-label="LinkedIn"
                >
                 <FaLinkedin />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
            <Footer/>
        </div>
    );
};

export default Contacts;