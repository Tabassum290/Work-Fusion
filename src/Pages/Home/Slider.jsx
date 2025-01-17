import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
const Slider = () => {
    return (
        <div>
                <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 10500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper h-[400px]"
      >
        <SwiperSlide>
            <div className='flex  justify-around items-center bg-[#465888] p-8'>
                <div className='text-white text-left my-20 w-1/2 '>
                <h1 className='lg:text-4xl text-xl text-white font-serif mb-4'>Empowering Teams, Simplifying Management</h1>
                <p>Effortless workflow and HR management at your fingertips.</p>
                </div>
                <div><img className='lg:w-full md:w-full w-[300px] lg:h-[400px] md:h-[400px] h-[200px]' src="https://i.ibb.co.com/TMsQnKt/download.png" alt="" /></div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className='flex  justify-around items-center bg-[#465888] p-8'>
                <div className='text-white text-left my-20 w-1/2 '>
                <h1 className='lg:text-4xl text-xl text-white font-serif mb-4'>Work Smarter, Manage Better</h1>
                <p>Streamline your tasks, payments, and performance tracking with ease.</p>
                </div>
                <div><img className='lg:w-full md:w-full w-[300px] lg:h-[400px] md:h-[400px] h-[200px]' src="https://i.ibb.co.com/mR09zPV/download.png" alt="" /></div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className='flex  justify-around items-center bg-[#465888] p-8'>
                <div className='text-white text-left my-20 w-1/2 '>
                <h1 className='lg:text-4xl text-xl text-white font-serif mb-4'>Your Workforce, Our Fusion</h1>
                <p>A seamless platform to manage employees and elevate productivity.</p>
                </div>
                <div><img className='lg:w-full md:w-full w-[300px] lg:h-[400px] md:h-[400px] h-[200px]' src="https://i.ibb.co.com/VqBRV7B/download.png" alt="" /></div>
            </div>
        </SwiperSlide>

      </Swiper>
        </div>
    );
};

export default Slider;