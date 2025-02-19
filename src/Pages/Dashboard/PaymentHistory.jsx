import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../Provider/AuthProvider";
import UseAxiosSecret from "../../Hooks/UseAxiosSecret";

const PaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = UseAxiosSecret();

  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user?.email}`);
      return res.data;
    },
  });

  return (
    <div className="my-12 w-full max-w-screen-lg mx-auto px-4">
      <h1 className="text-3xl font-serif text-center mb-6">Payment History</h1>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th>#</th>
              <th className="p-4">Month, Year</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Transaction ID</th>
            </tr>
          </thead>
          <tbody>
            {payments.length > 0 ? (
              payments.map((payment, index) => (
                <tr key={payment._id} className="hover:bg-gray-100 hover:text-black">
                  <td>{index + 1}</td>
                  <td>{new Date(payment.date).toLocaleDateString()}</td>
                  <td>{payment.salary}</td>
                  <td>{payment.transactionId}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">No payments found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
