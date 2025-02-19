import { useEffect, useState, useContext } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, Tooltip, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from 'recharts';
import { AuthContext } from '../../Provider/AuthProvider';
import UseAdmin from '../../Hooks/UseAdmin';
import UseHr from '../../Hooks/UseHr';
import UseAxiosSecret from '../../Hooks/UseAxiosSecret';

const Overview = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = UseAxiosSecret();
  const [isAdmin] = UseAdmin();
  const [isHR] = UseHr();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalJobsPosted: 0,
    totalApplications: 0,
    activeEmployees: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      let data;
      if (isAdmin) {
        // const res = axiosSecure('/users')
        // console.log(res.data)
      } else if (isHR) {
        data = await fetch('/api/hr/stats').then(res => res.json());
      } else {
        data = await fetch(`/api/employee/stats?userId=${user?.id}`).then(res => res.json());
      }
      setStats(data);
    };
    fetchStats();
  }, [user, isAdmin, isHR]);

  const barData = stats.jobApplications || [];

  const pieData = stats.userDistribution || [];
  const COLORS = ['#FF5733', '#36A2EB', '#FFCE56'];

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-3xl font-bold text-center">Dashboard Overview</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-gray-800 text-white rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">Total Users</h3>
          <p className="text-3xl font-bold">{stats.totalUsers}</p>
        </div>
        <div className="p-6 bg-gray-800 text-white rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">Total Jobs Posted</h3>
          <p className="text-3xl font-bold">{stats.totalJobsPosted}</p>
        </div>
        <div className="p-6 bg-gray-800 text-white rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">Total Applications</h3>
          <p className="text-3xl font-bold">{stats.totalApplications}</p>
        </div>
        <div className="p-6 bg-gray-800 text-white rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">Active Employees</h3>
          <p className="text-3xl font-bold">{stats.activeEmployees}</p>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 para">Applications Per Job</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="applications" fill="#4CAF50" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="p-6 bg-white rounded-lg shadow-md para">
        <h3 className="text-xl font-semibold mb-4">User Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={100} label>
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Overview;
