import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContect";

export default function useAuth() {
    return useContext(AuthContext)
}