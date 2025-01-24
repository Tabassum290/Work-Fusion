import  { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../Provider/AuthProvider";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic";


const PaymentHistory = () => {
    const {user} = useContext(AuthContext)
const axiosPublic= UseAxiosPublic();

  const { data: payments = []} = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosPublic.get('/payments')
       console.log(res.data)
      return res.data;
    },
  });

  return (
    <div className="my-12">
      <h1 className="text-3xl font-serif text-center mb-6">Payment History</h1>
      <table className="table w-full">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th>Email</th>
            <th className="p-4">Month, Year</th>
            <th className="p-4">Amount</th>
            <th className="p-4">Transaction ID</th>
          </tr>
        </thead>
        <tbody>
          {payments.length > 0 ? (
            payments.map((payment) => (
              <tr key={payment._id} className="hover:bg-gray-100">
                <td>{payment.email}</td>
                <td>{new Date(payment.date).toLocaleDateString()}</td>
                <td>{payment.salary}</td>
                <td>{payment.transactionId}</td>

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">No payments found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
