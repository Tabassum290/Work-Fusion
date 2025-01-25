import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_Payment);
const Payment = () => {
    return (
        <div className="w-[700px]">
                    <h2 className="text-2xl font-semibold text-center mb-6">Complete Your Payment</h2>
            <div className="border-2"><hr></hr></div>
  <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
        </div>
    );
};

export default Payment;