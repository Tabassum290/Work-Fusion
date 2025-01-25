import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import UseAxiosSecret from "../Hooks/UseAxiosSecret";
import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "../Hooks/UseAxiosPublic";

const CheckoutForm = () => {
  const { user } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [salary, setSalary] = useState(0);
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = UseAxiosSecret();
  const axiosPublic = UseAxiosPublic();
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: payroll = [] } = useQuery({
    queryKey: ["payroll", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payroll/${id}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (payroll.length > 0) {
      setSalary(payroll[0]?.salary || 0);
    }
  }, [payroll]);

  useEffect(() => {
    if (salary > 0) {
      axiosSecure.post("/payment", { salary }).then((res) => {
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [axiosSecure, salary]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) {
      setError("Please provide your card details.");
      return;
    }

    const { error: methodError, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (methodError) {
      setError(methodError.message);
      return;
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: user?.email || "Anonymous",
          name: user?.displayName || "Anonymous",
        },
      },
    });

    if (confirmError) {
      setError("Payment failed. Please try again.");
      return;
    }

    if (paymentIntent.status === "succeeded") {
      const payment = {
        email: payroll[0]?.email || "Anonymous",
        date: new Date().toLocaleString(),
        transactionId: paymentIntent.id,
        salary: salary,
        salaryId: payroll[0]?._id,
        employeeId: payroll[0]?.employeeId,
        status: "Paid",
      };

      await axiosPublic.post("/payments", payment);

      Swal.fire("Payment Successful!", `Transaction ID: ${paymentIntent.id}`, "success");
      navigate("/dashboard/payroll");
    }
  };

  return (
    <div className="flex justify-center items-center w-full px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <form onSubmit={handleSubmit}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": { color: "#aab7c4" },
                },
                invalid: { color: "#9e2146" },
              },
            }}
            className="p-3 border border-gray-300 rounded-md"
          />
          <button
            className="btn bg-blue-700 mt-6 text-white w-full py-2 rounded-md hover:bg-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={!stripe || !clientSecret || salary === 0}
          >
            Pay ${salary}
          </button>
          {error && <p className="text-red-600 mt-4">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
