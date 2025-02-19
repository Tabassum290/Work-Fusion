import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import React, { useContext, useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import UseWork from "../../Hooks/UseWork";
import UseAxiosSecret from "../../Hooks/UseAxiosSecret";
import { AuthContext } from "../../Provider/AuthProvider";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";

const Worksheetform = () => {
  const [startDate, setStartDate] = useState(new Date());
  const { register, handleSubmit, setValue } = useForm();
  const { user } = useContext(AuthContext);
  const axiosSecure = UseAxiosSecret();
  const [sortOrder, setSortOrder] = useState("asc");
  const [works, refetch] = UseWork();
  const axiosPublic = UseAxiosPublic();

  const handleDelete = async (workId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete the work entry.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosPublic.delete(`/works/${workId}`);
          const updatedWorks = works.filter(work => work._id !== workId);
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "The work has been deleted successfully.",
            icon: "success",
          });
        } catch (error) {
          console.error(error);
          Swal.fire({
            title: "Error!",
            text: "An error occurred while deleting the work.",
            icon: "error",
          });
        }
      }
    });
  };

  const handleEdit = async (workId) => {
    const { value: formData } = await Swal.fire({
      title: "Edit Work Entry",
      html: `
        <div class='my-6'>
          <label for="task mx-4">Select Task</label>
          <select id="task" class="swal2-input">
            <option value="Sales">Sales</option>
            <option value="Support">Support</option>
            <option value="Contact">Contact</option>
            <option value="PaperWork">PaperWork</option>
            <option value="Digital Marketer">Digital Marketer</option>
          </select>
        </div>
        <div>
          <label for="hours">Hours</label>
          <input type="text" id="hours"  class="swal2-input" placeholder="Type Working hour">
        </div>
        <div>
          <label for="date">Date</label>
          <input type="date" id="date" class="swal2-input">
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        const task = document.getElementById('task').value;
        const hours = document.getElementById('hours').value;
        const date = document.getElementById('date').value;
        if (!task || !hours || !date) {
          Swal.showValidationMessage("Please fill all the fields.");
          return false;
        }
        return { task, hours, date };
      },
      confirmButtonText: 'Submit Changes',
    });

    if (formData) {
      const { task, hours, date } = formData;

      try {
        await axiosPublic.put(`/works/${workId}`, { task, hours, date });
        const updatedWorks = works.map(work =>
          work._id === workId ? { ...work, task, hours, date } : work
        );
        refetch();
        Swal.fire("Success!", "Work entry has been updated.", "success");
      } catch (error) {
        console.error("Error updating the work entry", error);
        Swal.fire("Error!", "There was a problem updating the work entry.", "error");
      }
    }
  };
  const onSubmit = async (data) => {
    data.date = startDate;
    const workInfo = {
      task: data.tasks,
      hours: data.hours,
      date: data.date,
      email: user.email,
      name: user.displayName,
    };
    console.log('Submitting workInfo:', workInfo);
    const res = await axiosSecure.post(`/works`, workInfo);
    refetch();
    console.log(res.data);
    Swal.fire({
      title: 'Success!',
      text: 'Work has been added successfully.',
      icon: 'success',
      confirmButtonText: 'OK',
    });
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  const sortedWorks = [...works].sort((a, b) => {
    const aHours = parseInt(a.hours, 10); 
    const bHours = parseInt(b.hours, 10); 

    return sortOrder === "asc" ? aHours - bHours : bHours - aHours;
  });

  useEffect(() => {
    refetch(); 
  }, [sortOrder]);

  return (
    <div>
      <h1 className="text-3xl sm:text-3xl font-serif text-center my-6 sm:my-12 ">
        WorkSheet Form
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-4 ">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text name">Tasks</span>
          </div>
          <select
            defaultValue="default"
            {...register("tasks", { required: true })}
            className="select select-bordered w-full text-black"
          >
            <option disabled value="default">Select a Task</option>
            <option value="Sales">Sales</option>
            <option value="Support">Support</option>
            <option value="Contact">Contact</option>
            <option value="Paperwork">Paperwork</option>
            <option value="Marketer">Digital Marketer</option>
          </select>
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text name">Hours</span>
          </div>
          <input
            {...register("hours", { required: true })}
            type="text"
            placeholder="Type here"
            className="input input-bordered text-black"
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text name">Date</span>
          </div>
          <DatePicker
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
              setValue("date", date);
            }}
            className="input input-bordered w-full text-black"
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Action</span>
          </div>
          <button className="btn bg-blue-700 text-white">Add</button>
        </label>

      </form>

<div className="dropdown my-6">
<div tabIndex={0} role="button" className="btn px-12 text-black">Sort By</div>
<ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box w-52 px-2 shadow text-black" >
<li onClick={() => handleSortChange("asc")}><a>Ascending(Low to High)</a></li>
<li onClick={() => handleSortChange("desc")}><a>Descending(High to Low)</a></li>
</ul>
</div>
      <div className="overflow-x-auto my-12 name">
        <table className="table w-full">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-4">#</th>
              <th className="p-4">Task</th>
              <th className="p-4">Working Hour</th>
              <th className="p-4">Date</th>
              <th className="p-4">Action</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedWorks.map((work, index) => (
              <tr key={work._id} className="hover:bg-gray-100 hover:text-black">
                <th>{index + 1}</th>
                <td>{work.task}</td>
                <td>{work.hours}</td>
                <td>{new Date(work.date).toLocaleString()}</td>
                <td>
                  <button onClick={() => handleEdit(work._id)} className="btn bg-green-600 text-white btn-sm">Edit</button>
                </td>
                <td>
                  <button onClick={() => handleDelete(work._id)} className="btn bg-red-600 text-white btn-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Worksheetform;
