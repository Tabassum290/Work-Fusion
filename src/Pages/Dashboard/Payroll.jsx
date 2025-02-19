import { useQuery } from "@tanstack/react-query";
import UseAxiosSecret from "../../Hooks/UseAxiosSecret";
import { Link } from "react-router-dom";

const Payroll = () => {
  const axiosSecure = UseAxiosSecret();

  const { data: payrolls = [] } = useQuery({
    queryKey: ["payroll"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payroll");
      return res.data;
    },
  });

  return (
    <div className="w-full px-4 lg:px-8">
      <h1 className="text-2xl font-bold mb-4">Payroll Management</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Salary</th>
              <th>Month & Year</th>
              <th>Payment Date</th>
              <th>Pay</th>
            </tr>
          </thead>
          <tbody>
            {payrolls.map((employee, index) => (
              <tr key={employee._id} className="hover:bg-gray-100 hover:text-black">
                <td>{index + 1}</td>
                <td>{employee.name}</td>
                <td>${employee.salary}</td>
                <td>
                  {employee.month} / {employee.year}
                </td>
                <td>{employee.paymentDate ? new Date(employee.paymentDate).toLocaleString() : "Pending"}</td>
                <td>
                  <Link to={`/dashboard/payment/${employee._id}`}>
                    <button
                      className="btn btn-sm bg-green-600 text-white"
                      disabled={employee.status === "Paid"}
                    >
                      {employee.status === "Paid" ? "Paid" : "Pay"}
                    </button>
                  </Link>
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
