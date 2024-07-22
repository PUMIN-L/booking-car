import departmentApi from "../../apis/department-api"

export const paymentSlice = (set) => ({
    amountMoney: 0,
    loadingMoney: false,
    getMoney: async () => {
        try {
            set(() => ({ loadingMoney: true }))
            const response = await departmentApi.getMoney()
            set(() => ({ amountMoney: response.data.result }))
        } catch (error) {
            console.log(error)
        } finally {
            set(() => ({ loadingMoney: false }))
        }
    }
})