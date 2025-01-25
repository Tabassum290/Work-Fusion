import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "../Hooks/UseAxiosPublic";

const Messages = () => {
const axiosPublic = UseAxiosPublic();
const {data : contacts = []} = useQuery({
    queryKey:['contact'],
    queryFn:async() =>{
        const res = await axiosPublic.get('/contact')
        return res.data;
    }
})

    return (
        <div className="lg:w-[600px] p-8">
            <section className="bg-gray-100 py-16">
        <div className="container mx-auto lg:px-6 px-2">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
            User <span className="text-blue-600">Messages</span>
          </h2>
          <div className="space-y-8">
            {contacts.length === 0 ? (
              <p className="text-center text-gray-600">No messages available</p>
            ) : (
              contacts.map((con, index) => (
                <div key={index} className="bg-white shadow-lg rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {con.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">{con.email}</p>
                  <p className="text-gray-600">{con.message}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
        </div>
    );
};

export default Messages;