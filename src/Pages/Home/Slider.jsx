import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
const Slider = () => {
  const {user} = useContext(AuthContext);
    return (
        <div className='h-[600px] max-w-7xl mx-auto mt-4'>
                <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
            <div className='flex lg:flex-row md:flex-row flex-col-reverse justify-around items-center bg-[#465888] p-8'>
                <div className='text-white text-left lg:w-1/2'>
                <h1 className='lg:text-5xl md:text-3xl text-xl text-white font-serif mb-4 lg:px-4 md:px-2'>Empowering Teams, Simplifying Management</h1>
                <p className='text-lg lg:px-4 md:px-2 text-gray-200'>Effortless workflow and HR management at your fingertips.</p>
                {
                  user ?   <Link to='/' className='btn btn-outline text-white lg:m-6'>Explore</Link> : <Link to='/login' className='btn btn-outline text-white lg:m-6'>Get Started</Link>
                }

                </div>
                <div><img className='lg:w-full md:w-full w-[300px] lg:h-[400px] md:h-[400px] h-[200px]' src="https://i.ibb.co.com/bX7MMN4/download.png" alt="" /></div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className='flex lg:flex-row md:flex-row flex-col-reverse justify-around items-center bg-[#465888] p-8'>
                <div className='text-white text-left lg:w-1/2'>
                <h1 className='lg:text-5xl md:text-3xl text-xl text-white font-serif mb-4 lg:px-4 md:px-2'>Work Smarter, Manage Better</h1>
                <p className='text-lg lg:px-4 md:px-2 text-gray-200'>Streamline your tasks, payments, and performance tracking with ease.</p>
                {
                  user ?   <Link to='/' className='btn btn-outline text-white lg:m-6'>Explore</Link> : <Link to='/login' className='btn btn-outline text-white lg:m-6'>Get Started</Link>
                }
                </div>
                <div><img className='lg:w-full md:w-full w-[300px] lg:h-[400px] md:h-[400px] h-[200px]' src="https://i.ibb.co.com/TcktThq/download.png" alt="" /></div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className='flex lg:flex-row md:flex-row flex-col-reverse justify-around items-center bg-[#465888] p-8'>
                <div className='text-white text-left lg:w-1/2'>
                <h1 className='lg:text-5xl md:text-3xl text-xl text-white font-serif mb-4 lg:px-4 md:px-2'>Your Workforce, Our Fusion</h1>
                <p className='text-lg lg:px-4 md:px-2 text-gray-200'>A seamless platform to manage employees and elevate productivity.</p>
                {
                  user ?   <Link to='/' className='btn btn-outline text-white lg:m-6'>Explore</Link> : <Link to='/login' className='btn btn-outline text-white lg:m-6'>Get Started</Link>
                }
                </div>
                <div><img className='lg:w-full md:w-full w-[300px] lg:h-[400px] md:h-[400px] h-[200px]' src="https://i.ibb.co.com/mXZ4K6H/download.png" alt="" /></div>
            </div>
        </SwiperSlide>

      </Swiper>
        </div>
    );
};

export default Slider;