import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { userSilce } from "./slice/userSlice";
import { carSilce } from "./slice/carSlice";
import { paymentSlice } from "./slice/paymentSlice";


export const useStore = create(
    devtools((...a) => ({
        ...userSilce(...a),
        ...carSilce(...a),
        ...paymentSlice(...a),
    }))
)