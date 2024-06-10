import axios from "axios";

const carApi = {}

carApi.registerCar = (body) => axios.post("cars/registerCar", body)
carApi.getAllCar = () => axios.get("cars")

export default carApi