import Swal from "sweetalert2";
import UseWork from "../../Hooks/UseWork";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";

const WorksheetTable = () => {
const[works,refetch] = UseWork();
const axiosPublic = UseAxiosPublic()

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
        const hours= document.getElementById('hours').value;
        const date = document.getElementById('date').value;
         if (!task || !hours|| !date) {
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
        refetch(); 
        Swal.fire("Success!", "Work entry has been updated.", "success");
      } catch (error) {
        console.error("Error updating the work entry", error);
        Swal.fire("Error!", "There was a problem updating the work entry.", "error");
      }
    }
  };
  


    return (
        <div>
              <div className="overflow-x-auto my-12">
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
              {works.map((work, index) => (
                <tr key={work._id} className="hover:bg-gray-100">
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

export default WorksheetTable;