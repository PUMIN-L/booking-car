import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";


import CheckoutForm from "./CheckoutForm";
import stripeApi from "../../apis/stripe-api";

function Payment() {

  const [stripePromise, setStripePromise] = useState(null)
  const [clientSecret, setClientSecret] = useState("")

  useEffect(() => {

    const fetchConfig = async () => {
      try {
        const response = await stripeApi.config()
        setStripePromise(loadStripe(response.data.publishableKey))
      } catch (error) {
        console.log(error)
      }
    }
    fetchConfig()
  }, [])

  useEffect(() => {
    const createPayment = async () => {
      const clientSecretResponse = await stripeApi.crementPaymentIntent()
      setClientSecret(clientSecretResponse.data.clientSecret)
    }
    createPayment()
  }, [])

  return (
    <>

      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <div className="w-[25rem] bg-white p-5 rounded-lg ">
            <CheckoutForm />
          </div>

        </Elements>
      )}
    </>
  );
}

export default Payment;
