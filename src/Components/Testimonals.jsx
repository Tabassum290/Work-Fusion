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
        })
    },[])
    return (
        <div className="py-10 px-4 bg-white">
        <h2 className="lg:text-5xl text-3xl font-bold text-center mb-6">What People Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="p-6 bg-gray-100 rounded-lg shadow-md">
                <p className="text-gray-700 mb-4 italic">"{testimonial.feedback}"</p>
              <div className="flex justify-between items-center">
             <div>
             <h3 className="font-bold text-lg">{testimonial.name}</h3>
             <p className="text-sm text-gray-500">{testimonial.designation}</p>
             </div>
             <div className="text-2xl text-yellow-500 flex">
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
          </div>
      
      </div>
    );
};

export default Testimonals;