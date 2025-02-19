import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import UseHr from "../../Hooks/UseHr";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import UseAxiosSecret from "../../Hooks/UseAxiosSecret";
import { FaUsers } from "react-icons/fa";
import { FcOk } from "react-icons/fc";
import { ImSpinner } from "react-icons/im";
const OverviewHr = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = UseAxiosSecret();
    const [isHr] = UseHr();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                if (isHr) {
                    const res = await axiosSecure.get('/employee-users');
                    console.log("Fetched Users:", res.data.user); 
                    setUsers(res.data.user || []);
                }
            } catch (error) {
                console.error('Failed to fetch users:', error);
            }
        };
        fetchUsers();
    }, [isHr]);

    const totalUsers = users.length;
    const completedTasks = users.filter(user => user?.isVerified === true).length;
    const pendingTasks = users.filter(user => user?.isVerified === false).length;

    // Bar Chart Data
    const barChartData = [
        { name: "Pending", value: pendingTasks },
        { name: "Completed", value: completedTasks },
    ];

    const pieChartData = [
        { name: "Pending Tasks", value: pendingTasks },
        { name: "Completed Tasks", value: completedTasks },
    ];

    const COLORS = ["#FF5733", "#2ECC71"]; 

    return (
        <div className="w-full p-6 bg-gray-100">
            <h1 className="text-2xl font-bold mb-4 text-center text-black">Dashboard Overview</h1>
            <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="bg-green-500 flex justify-between p-6 rounded-lg text-white shadow-md">
                    <div>
                    <h2 className="text-xl font-semibold ">Total Employee</h2>
                    <p className="text-3xl font-bold">{totalUsers}</p>
                    </div>
<div>
    <FaUsers className='text-6xl p-1'></FaUsers>
</div>
                </div>
                <div className="text-white bg-pink-600  flex justify-between p-6 rounded-lg shadow-md">
                    <div>
                    <h2 className="text-xl font-semibold">Completed Payment</h2>
                    <p className="text-3xl font-bold text-white">{completedTasks}</p>
                    </div>

                    <div>
 <FcOk className='text-6xl p-1'></FcOk>
                    </div>
                </div>
                <div className="bg-red-600 text-white flex justify-between p-6 rounded-lg shadow-md">
                    <div>
                    <h2 className="text-xl font-semibold">Pending Tasks</h2>
                    <p className="text-3xl font-bold">{pendingTasks}</p>
                    </div>

                    <div>
                    <ImSpinner className="text-6xl p-1" />
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-2 gap-6">
                {/* Bar Chart */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Task Overview</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={barChartData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Pie Chart */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Task Distribution</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={pieChartData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                fill="#8884d8"
                                label
                            >
                                {pieChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default OverviewHr;
