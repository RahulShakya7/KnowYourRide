import { Navigate } from "react-router-dom"
import { useAuth } from "../utils/Authcontext"

export const RequireAuth = ({ children }) => {
    const auth = useAuth()
    console.log(auth)
    if (!auth.email) {
        return <Navigate to={'/'} />
    }
    return children
}