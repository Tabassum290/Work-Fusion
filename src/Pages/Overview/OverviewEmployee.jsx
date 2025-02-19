import { useEffect, useState, useContext } from "react";
import { BarChart, Bar, PieChart, Pie, Cell, Tooltip, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts";
import { AuthContext } from "../../Provider/AuthProvider";
import UseAxiosSecret from "../../Hooks/UseAxiosSecret";
import { FaDollarSign, FaMoneyBill } from "react-icons/fa";
import { FcOk } from "react-icons/fc";
import { ImCross } from "react-icons/im";

const OverviewEmployee = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = UseAxiosSecret();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosSecure.get(`/payments/${user?.email}`); // Adjust the API endpoint as needed
        setUsers(res.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    fetchUsers();
  }, [user?.email]);
 console.log(users)
  const totalSalaries = users.reduce((total, record) => total + record.salary, 0);
  const totalPayments = users.length;
  const uniqueEmployees = [...new Set(users.map((record) => record.employeeID))].length;

  const salaryDistribution = [
    { name: "Total Payments", value: totalPayments },
    { name: "Unique Employees", value: uniqueEmployees },
    { name: "Total Salaries", value: totalSalaries },
  ];

  const COLORS = ["#4CAF50", "#FF5733", "#36A2EB"];

  return (
    <div className="w-full p-6 space-y-6">
      <h2 className="text-3xl font-bold text-center">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-6">
        {/* Total Payments */}
        <div className="p-6 bg-green-700 flex justify-between text-white rounded-lg shadow-md">
          <div>
            <h3 className="text-xl font-semibold flex">Total Payments</h3>
            <p className="text-3xl font-bold">{totalPayments}</p>
          </div>
          <div>
            <FaDollarSign className="text-6xl p-1" />
          </div>
        </div>

        <div className="p-6 bg-blue-800 flex justify-between text-white rounded-lg shadow-md">
          <div>
            <h3 className="text-xl font-semibold">Unique Employees</h3>
            <p className="text-3xl font-bold">{uniqueEmployees}</p>
          </div>
          <div>
            <FcOk className="text-6xl p-1" />
          </div>
        </div>

        <div className="p-6 bg-red-700 flex justify-between text-white rounded-lg shadow-md">
          <div>
            <h3 className="text-xl font-semibold">Total Earning</h3>
            <p className="text-3xl font-bold">{totalSalaries}</p>
          </div>
          <div>
            <FaMoneyBill className="text-6xl p-2" />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row md:flex-row gap-5 my-6">
        <div className="p-6 bg-white rounded-lg shadow-md w-full">
          <h3 className="text-xl font-semibold mb-4 text-black">Salary</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salaryDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#4CAF50" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md w-full">
          <h3 className="text-xl font-semibold mb-4 text-black">Total Earning</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={salaryDistribution} dataKey="value" nameKey="name" outerRadius={100} label>
                {salaryDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default OverviewEmployee;
