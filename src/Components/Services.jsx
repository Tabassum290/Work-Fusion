import { useEffect, useState } from "react";


const Services = () => {
    const [services,setServices] = useState([]);
    useEffect(()=>{
        fetch('Service.json')
        .then(res => res.json())
        .then(data =>{ 
            setServices(data.services);
        })
    },[])
    return (
        <div className="py-10 px-4 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-6">Our Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition"
          >
            <div className="flex items-center mb-4">
              <img src={service.icon} alt={service.title} className="w-12 h-12 mr-4" />
              <h3 className="text-xl font-bold">{service.title}</h3>
            </div>
            <p className="text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
    );
};

export default Services;