import { useState } from "react";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const Progress = () => {
  const axiosPublic = UseAxiosPublic();
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [sortOrder, setSortOrder] = useState("asc");

  const { data: works = [], isLoading, error, refetch } = useQuery({
    queryKey: ['works', selectedEmployee, selectedMonth, sortOrder],
    queryFn: async () => {
      const res = await axiosPublic.get(`/works?sortOrder=${sortOrder}&month=${selectedMonth}`);
      console.log(res.data);
      return res.data;
    },
  });

  const uniqueMonths = Array.from(
    new Set(
      works.map((work) => {
        const date = new Date(work.date);
        return date.toLocaleString('default', { month: 'long', year: 'numeric' });
      })
    )
  );

  const filteredWorks = works.filter((work) => {
    const employeeMatch = selectedEmployee ? work.name === selectedEmployee : true;
    const monthMatch = selectedMonth
      ? new Date(work.date).toLocaleString('default', { month: 'long', year: 'numeric' }) === selectedMonth
      : true;
    return employeeMatch && monthMatch;
  });

  const handleSortChange = (order) => {
    setSortOrder(order);
  };
  const sortedWorks = [...filteredWorks].sort((a, b) => {
    const aHours = parseInt(a.hours, 10); 
    const bHours = parseInt(b.hours, 10);

    return sortOrder === "asc" ? aHours - bHours : bHours - aHours;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <h1 className="text-xl sm:text-2xl font-bold text-center mb-6">
        Work Records: {sortedWorks.length}
      </h1>
      <p className="text-center">Sort By</p>
      <div className="flex justify-center gap-4 mb-4">
       <select
          className="select select-bordered text-black"
          value={sortOrder}
          onChange={(e) => handleSortChange(e.target.value)}
        > 
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 name">Select Employee:</label>
          <select
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            className="w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300 text-black "
          >
            <option value="">All Employees</option>
            {works.map((emp) => (
              <option key={emp._id} value={emp.name}>
                {emp.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 name">Select Month:</label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-300 text-black"
          >
            <option value="">All Months</option>
            {uniqueMonths.map((month, index) => (
              <option key={index} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="w-full border-collapse bg-white">
          <thead className="bg-blue-700 text-white">
            <tr>
              <th className="p-4 text-left text-sm font-semibold">Employee Name</th>
              <th className="p-4 text-left text-sm font-semibold">Working Hours</th>
              <th className="p-4 text-left text-sm font-semibold">Date</th>
              <th className="p-4 text-left text-sm font-semibold">Task</th>
            </tr>
          </thead>
          <tbody>
            {sortedWorks.map((work) => (
              <tr key={work._id} className="hover:bg-gray-100">
                <td className="p-4 text-sm text-gray-700">{work.name}</td>
                <td className="p-4 text-sm text-gray-700">{work.hours}h</td>
                <td className="p-4 text-sm text-gray-700">
                  {new Date(work.date).toLocaleString('default', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </td>
                <td className="p-4 text-sm text-gray-700">{work.task}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Progress;
