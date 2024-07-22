import axios from "axios"


const stripeApi = {}

stripeApi.config = () => axios.get("http://localhost:8288/config")
stripeApi.crementPaymentIntent = () => axios.post("http://localhost:8288/create-payment-intent")



export default stripeApi  