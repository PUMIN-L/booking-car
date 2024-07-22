import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate()

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/completion`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsProcessing(false);
  };


  const paymentElementOptions = {
    layout: "tabs"
  }



  return (

    <form id="payment-form" onSubmit={handleSubmit}>
      {/* <PaymentElement id="payment-element" /> */}
      <PaymentElement />
      <div className="flex justify-between ">
        <button
          onClick={() => navigate("/")}
          disabled={isProcessing || !stripe || !elements} id="submit"
          className="bg-blue-400 p-2 border-2 text-white rounded-lg mt-5 min-w-20"
        >
          <span id="button-text">
            Back to Home page
          </span>
        </button>
        <button
          disabled={isProcessing || !stripe || !elements} id="submit"
          className="bg-blue-400 p-2 border-2 text-white rounded-lg mt-5"
        >
          <span id="button-text">
            {isProcessing ? "Processing ... " : "Pay now"}
          </span>
        </button>
      </div>

      {/* Show any error or success messages */}
      {message && <div id="payment-message" className="text-red-500 mt-2 ml-1">{message}</div>}
    </form>
  );
}
