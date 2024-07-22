

import axios from "../config/axios"

const departmentApi = {}

departmentApi.getMoney = () => axios.get("/department")
departmentApi.updateMoney = (data) => axios.patch("department/updateMoney", data)

export default departmentApi

