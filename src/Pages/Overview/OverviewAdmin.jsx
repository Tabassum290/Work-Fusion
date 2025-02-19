import { useEffect, useState, useContext } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, Tooltip, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from 'recharts';
import { AuthContext } from '../../Provider/AuthProvider';
import UseAdmin from '../../Hooks/UseAdmin';
import UseAxiosSecret from '../../Hooks/UseAxiosSecret';
import { FaUsers, FaUserTie } from 'react-icons/fa';
import { FcOk } from 'react-icons/fc';
import { ImCross } from 'react-icons/im';

const OverviewAdmin = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = UseAxiosSecret();
  const [isAdmin] = UseAdmin();
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (isAdmin) {
          const res = await axiosSecure.get('/users');
          setUsers(res.data);
        }
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };
    fetchUsers();
  }, [isAdmin]);
  const totalUsers = users.length;
  const totalAdmins = users.filter(user => user.role === 'admin').length;
  const totalHRs = users.filter(user => user.role === 'hr').length;
  const firedEmployees = users.filter(user => user.role === 'fired').length;
  const activeEmployees = totalUsers - (totalAdmins + totalHRs + firedEmployees);
  const roleDistribution = [
    { name: 'Active Employees', value: activeEmployees },
    { name: 'Fired Employees', value: firedEmployees },
    { name: 'HR', value: totalHRs },
    { name: 'Admin', value: totalAdmins }
  ];
  
  const COLORS = ['#4CAF50', '#FF5733', '#36A2EB', '#FFCE56'];

  return (
    <div className="w-full p-6 space-y-6">
      <h2 className="text-3xl font-bold text-center">Dashboard Adin</h2>
      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-6">
        <div className="p-6 bg-green-700 flex justify-between text-white rounded-lg shadow-md">
          <div>
          <h3 className="text-xl font-semibold flex ">Total Users
          </h3>
          <p className="text-3xl font-bold">{totalUsers}</p>
          </div>

          <div>
          <FaUsers className='text-6xl p-1'></FaUsers>
          </div>
        </div>
        <div className="p-6 bg-blue-800 flex justify-between text-white rounded-lg shadow-md">
          <div>
          <h3 className="text-xl font-semibold">Active Employees</h3>
          <p className="text-3xl font-bold">{activeEmployees}</p>
          </div>
    <div>
   <FcOk className='text-6xl p-1'></FcOk>
    </div>
        </div>
        <div className="p-6 bg-red-700 flex justify-between text-white rounded-lg shadow-md">
          <div>
          <h3 className="text-xl font-semibold">Fired Employees</h3>
          <p className="text-3xl font-bold">{firedEmployees}</p>
          </div>
         <div>
         <ImCross className='text-6xl p-2' />
         </div>
        </div>
        <div className="p-6 bg-yellow-500 flex justify-between text-white rounded-lg shadow-md">
          <div>
          <h3 className="text-xl font-semibold">HR Count</h3>
          <p className="text-3xl font-bold">{totalHRs}</p>
          </div>
          <div>
          <FaUserTie  />
          </div>
        </div>
      </div>

<div className='flex flex-col lg:flex-row md:flex-row gap-5 my-6'>
      {/* Bar Chart - Role Distribution */}
      <div className="p-6 bg-white rounded-lg shadow-md w-full">
        <h3 className="text-xl font-semibold mb-4 text-black">Employee Role Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={roleDistribution}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#4CAF50" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart - User Role Distribution */}
      <div className="p-6 bg-white rounded-lg shadow-md w-full">
        <h3 className="text-xl font-semibold mb-4 text-black">User Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={roleDistribution} dataKey="value" nameKey="name" outerRadius={100} label>
              {roleDistribution.map((entry, index) => (
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

export default OverviewAdmin;
