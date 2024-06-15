import axios from "../config/axios"

const userApi = {}

userApi.getAlluser = () => axios.get("/user/alluser")

export default userApi