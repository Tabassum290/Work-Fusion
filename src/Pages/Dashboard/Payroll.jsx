import { useQuery } from "@tanstack/react-query";
import UseAxiosSecret from "../../Hooks/UseAxiosSecret";
import Swal from "sweetalert2";

const Payroll = () => {
  const axiosSecure = UseAxiosSecret();

  const { data: payrolls = [], refetch } = useQuery({
    queryKey: ["payroll"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payroll");
      return res.data;
    },
  });

  const handlePay = async (id) => {
    const result = await Swal.fire({
      title: "Confirm Payment",
      text: "Are you sure you want to make this payment?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Pay",
    });

    if (result.isConfirmed) {
      try {
        const response = await axiosSecure.patch(`/payroll/pay/${id}`);

        if (response.data.modifiedCount > 0) {
          refetch();
          Swal.fire("Success", "The payment has been completed.", "success");
        }
      } catch (error) {
        console.error("Payment failed:", error);
        Swal.fire("Error", "Payment could not be completed.", "error");
      }
    }
  };

  const handleUpdateSalary = (id, currentSalary, newSalary) => {
    if (newSalary <= currentSalary) {
      alert("Salary must be higher than the current salary!");
      return;
    }
  
    axiosSecure
      .patch(`/payroll/update-salary/${id}`, { salary: Number(newSalary) })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          alert("Salary updated successfully!");
        }
      })
      .catch((error) => {
        console.error("Error updating salary:", error);
        alert("Failed to update salary.");
      });
  };
  


  return (
    <div className="w-full px-4 lg:px-8">
      <h1 className="text-2xl font-bold mb-4">Payroll Management</h1>
      <div className="overflow-x-auto">
  <table className="table w-full">
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Current Salary</th>
        <th>New Salary</th>
        <th>Update</th>
      </tr>
    </thead>
    <tbody>
      {payrolls.map((employee, index) => (
        <tr key={employee._id}>
          <td>{index + 1}</td>
          <td>{employee.name}</td>
          <td>${employee.salary}</td>
          <td>
            <input
              type="number"
              className="input input-bordered w-full max-w-xs"
              placeholder="Enter new salary"
              onChange={(e) =>
                (employee.newSalary = Number(e.target.value)) // Temporarily store the new salary
              }
            />
          </td>
          <td>
            <button
              className="btn btn-primary"
              onClick={() =>
                handleUpdateSalary(employee._id, employee.salary, employee.newSalary)
              }
            >
              Update Salary
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </div>
  );
};

export default Payroll;
