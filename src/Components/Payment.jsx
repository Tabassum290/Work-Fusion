import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_Payment);
const Payment = () => {
    return (
        <div className="w-[700px]">
            <h1 className="text-center text-3xl font-serif font-bold mb-6">Payment</h1>
            <div className="border-2 mb-12"><hr></hr></div>
  <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
        </div>
    );
};

export default Payment;