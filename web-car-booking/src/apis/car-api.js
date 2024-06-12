import axios from "axios";

const carApi = {}

carApi.registerCar = (body) => axios.post("cars/registerCar", body)
carApi.getAllCar = () => axios.get("cars")
carApi.getCarById = (id) => axios.post(`cars/${id}`)

export default carApi