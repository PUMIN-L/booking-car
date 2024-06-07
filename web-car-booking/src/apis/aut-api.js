import axios from "../config/axios"

const autApi = {}

autApi.register = (body) => axios.post("/auth/register", body)
autApi.login = (body) => axios.post("/auth/login", body)
autApi.getMe = () => axios.get("/auth/me")


export default autApi  