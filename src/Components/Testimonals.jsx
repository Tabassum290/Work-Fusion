import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { useState } from "react";
import { useEffect } from "react";
import { FaStar } from "react-icons/fa";


const Testimonals = () => {
    const [testimonials,setTestimonials] = useState([]);
    useEffect(()=>{
        fetch('testimonal.json')
        .then(res => res.json())
        .then(data =>{
            setTestimonials(data.testimonials)
            console.log(data)
        })
    },[])
    return (
        <div className="py-10 px-4 bg-white">
        <h2 className="text-3xl font-bold text-center mb-6">What People Say</h2>
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={30}
          slidesPerView={1}
          className="max-w-lg mx-auto"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="p-6 bg-gray-100 rounded-lg shadow-md">
                <p className="text-gray-700 mb-4 italic">"{testimonial.feedback}"</p>
              <div className="flex justify-between items-center">
             <div>
             <h3 className="font-bold text-lg">{testimonial.name}</h3>
             <p className="text-sm text-gray-500">{testimonial.designation}</p>
             </div>
             <div className="text-2xl text-green-500 flex">
              <FaStar></FaStar>
              <FaStar></FaStar>
              <FaStar></FaStar>
              <FaStar></FaStar>
              <FaStar></FaStar>
             </div>
              </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
};

export default Testimonals;