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
    jobApplications: [],
    userDistribution: [],
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        let data = {};

        if (isAdmin) {
          // Uncomment and implement admin API call when available
          // const res = await axiosSecure('/users');
          // data = res.data;
        } else if (isHR) {
          const res = await fetch('/api/hr/stats');
          data = await res.json();
        } else {
          const res = await fetch(`/api/employee/stats?userId=${user?.id}`);
          data = await res.json();
        }

        // Ensure all required properties exist to prevent errors
        setStats({
          totalUsers: data?.totalUsers ?? 0,
          totalJobsPosted: data?.totalJobsPosted ?? 0,
          totalApplications: data?.totalApplications ?? 0,
          activeEmployees: data?.activeEmployees ?? 0,
          jobApplications: data?.jobApplications ?? [],
          userDistribution: data?.userDistribution ?? [],
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    };

    fetchStats();
  }, [user, isAdmin, isHR]);

  const barData = stats?.jobApplications ?? [];
  const pieData = stats?.userDistribution ?? [];
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

      {/* Bar Chart - Applications Per Job */}
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-black">Applications Per Job</h3>
        {barData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="applications" fill="#4CAF50" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500 text-center">No application data available.</p>
        )}
      </div>

      {/* Pie Chart - User Distribution */}
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-black">User Distribution</h3>
        {pieData.length > 0 ? (
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
        ) : (
          <p className="text-gray-500 text-center">No user distribution data available.</p>
        )}
      </div>
    </div>
  );
};

export default Overview;
