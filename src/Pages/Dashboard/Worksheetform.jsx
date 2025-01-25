import { useForm } from "react-hook-form"
import Swal from 'sweetalert2'
import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import UseWork from "../../Hooks/UseWork";
import UseAxiosSecret from "../../Hooks/UseAxiosSecret";
import { AuthContext } from "../../Provider/AuthProvider";
const Worksheetform = () => {
    const [startDate, setStartDate] = useState(new Date());
    const { register, handleSubmit,setValue } = useForm()
    const {user} = useContext(AuthContext);
    const axiosSecure = UseAxiosSecret()
    const [works,refetch] = UseWork();


    const onSubmit = async(data) => {
      data.date = startDate;
      const workInfo = {
        task: data.tasks,
        hours: data.hours,
        date: data.date,
        email: user.email,
        name:user.displayName, 
      };
      console.log('Submitting workInfo:', workInfo);
      const res = await axiosSecure.post('/works',workInfo)
      refetch();
      console.log(res.data)
      Swal.fire({
        title: 'Success!',
        text: 'Work has been added successfully.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    }

    return (
        <div >
        <h1 className="text-3xl sm:text-3xl font-serif text-center my-6 sm:my-12">
          WorkSheet Form
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-4"
        >
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Tasks</span>
            </div>
            <select
              defaultValue="default"
              {...register("tasks", { required: true })}
              className="select select-bordered w-full"
            >
              <option disabled value="default">
                Select a Task
              </option>
              <option value="Sales">Sales</option>
              <option value="Support">Support</option>
              <option value="Contact">Contact</option>
              <option value="Paperwork">Paperwork</option>
              <option value="marketer">Digital Marketer</option>
            </select>
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Hours</span>
            </div>
            <input
              {...register("hours", { required: true })}
              type="text"
              placeholder="Type here"
              className="input input-bordered"
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Date</span>
            </div>
            <DatePicker
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
              setValue("date", date); 
            }}
            className="input input-bordered w-full"
          />
          </label>
          <label className="form-control w-full">
            <div className="label">
            <span className="label-text">Action</span>
            </div>
           <button className="btn bg-blue-700 text-white">Add</button>
          </label>
        </form>
      </div>
      
    );
};

export default Worksheetform;