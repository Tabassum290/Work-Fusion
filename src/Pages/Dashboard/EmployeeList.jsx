import { useState, useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import UseAxiosSecret from '../../Hooks/UseAxiosSecret';
import { FcOk } from 'react-icons/fc';
import { ImCross } from 'react-icons/im';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
  const { user } = useContext(AuthContext); 
  const axiosSecure = UseAxiosSecret();
  const [selectedEmployee, setSelectedEmployee] = useState(null); 
  const [modalData, setModalData] = useState({ month: '', year: '' });

  const { data: users = [], refetch } = useQuery({
    queryKey: ['users'], 
    queryFn: async () => {
      const res = await axiosSecure.get('employee-users');
      return res.data.user;
    },
  });

  const handleToggle = async (id) => {
    try {
      const res = await axiosSecure.patch(`/users/verify/${id}`); 
      refetch();
    } catch (error) {
      console.error('Error toggling verification status:', error);
    }
  };

  const openModal = (employee) => {
    setSelectedEmployee(employee);
    setModalData({ month: '', year: '' });
  };


  const closeModal = () => {
    setSelectedEmployee(null);
  };

  const handleSubmitPayment = async () => {
    if (!modalData.month || !modalData.year) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const paymentRequest = {
        employeeId: selectedEmployee._id,
        name: selectedEmployee.name,
        salary: selectedEmployee.salary,
        month: modalData.month,
        year: modalData.year,
        status: 'Pending Approval', 
      };

      const res = await axiosSecure.post('/payroll', paymentRequest);
      console.log('Payment request submitted:', res.data);
      toast.success('Payment request submitted successfully.');
      closeModal();
    } catch (error) {
      console.log('Error submitting payment request:', error);
      toast.error('Failed to submit payment request. Try again.');
    }
  };



  return (
    <div>
      <div className="overflow-x-auto my-12">
        <table className="table w-full">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-4">#</th>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Bank Account</th>
              <th className="p-4">Salary</th>
              <th className="p-4">Verified</th>
              <th className="p-4">Pay</th>
              <th className="p-4">Details</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="hover:bg-gray-100">
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.bank}</td>
                <td>{user.salary}</td>
                <td>
                  <button
                    onClick={() => handleToggle(user._id)}
                    className="flex items-center text-xl"
                  >
                    {user.isVerified ? <FcOk /> : <ImCross className="text-2xl text-red-600" />}
                  </button>
                </td>
                <td>
                   <button
                    className={`btn ${
                      user.isVerified ? 'bg-green-600' : 'bg-gray-300 cursor-not-allowed'
                    } text-white btn-sm`}
                    disabled={!user.isVerified} 
                    onClick={() => openModal(user)} 
                  >
                    Pay
                  </button>
                </td>
                <td>
                  <Link to={`/dashboard/details/${user._id}`}
                    className="btn bg-red-600 text-white btn-sm"
                   
                  >
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8 w-96">
            <h2 className="text-xl font-bold mb-4">Payment Request</h2>
            <p className="mb-4">
              <strong>Employee Name:</strong> {selectedEmployee.name}
            </p>
            <p className="mb-4">
              <strong>Salary:</strong> ${selectedEmployee.salary}
            </p>
            <div className="mb-4">
              <label className="block mb-2">Month:</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={modalData.month}
                onChange={(e) => setModalData({ ...modalData, month: e.target.value })}
                placeholder="e.g., January"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Year:</label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={modalData.year}
                onChange={(e) => setModalData({ ...modalData, year: e.target.value })}
                placeholder="e.g., 2025"
              />
            </div>
            <div className="flex justify-end">
              <button className="btn btn-sm bg-gray-500 text-white mr-2" onClick={closeModal}>
                Cancel
              </button>
              <button className="btn btn-sm bg-blue-600 text-white" onClick={handleSubmitPayment}>
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
