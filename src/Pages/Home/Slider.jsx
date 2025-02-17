import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';

const Slider = () => {
  const { user } = useContext(AuthContext);
  
  const slides = [
    {
      title: 'Empowering Teams, Simplifying Management',
      text: 'Effortless workflow and HR management at your fingertips.',
      image: 'https://i.ibb.co/4w5Ryqth/business-people-standing-row-with-thumbs-up-1262-827.jpg',
    },
    {
      title: 'Work Smarter, Manage Better',
      text: 'Streamline your tasks, payments, and performance tracking with ease.',
      image: 'https://i.ibb.co.com/6JVkc7zG/group-five-indian-businessman-suits-posed-outdoor-winter-day-europe-627829-13343.jpg',
    },
    {
      title: 'Your Workforce, Our Fusion',
      text: 'A seamless platform to manage employees and elevate productivity.',
      image: 'https://i.ibb.co.com/LXBYFJBc/group-six-indian-businessman-suits-posed-outdoor-winter-day-europe-627829-1400.jpg',
    }
  ];

  return (
    <div className='max-w-7xl mx-auto mt-4'>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[ Pagination, Navigation]}
        className="mySwiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="h-[500px] flex items-center justify-center text-center bg-cover bg-center relative"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>

              <div className="relative text-white px-4">
                <h1 className="text-3xl md:text-5xl font-serif mb-4">{slide.title}</h1>
                <p className="text-lg text-gray-200 mb-6">{slide.text}</p>
                {user ? (
                  <Link to="/" className="btn btn-outline text-white">Explore</Link>
                ) : (
                  <Link to="/login" className="btn btn-outline text-white">Get Started</Link>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
