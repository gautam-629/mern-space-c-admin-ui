
import { Link, Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../store'

const Dashboard = () => {
    const { user } = useAuthStore();
    if (user === null) {
        return <Navigate to={"auth/login"} replace={true} />
    }
    return (
        <div>
            <h1>Dashboard Layput</h1>
            <Link to={"/auth/login"}>Go to Login Page</Link>
            <Outlet />
        </div>
    )
}

export default Dashboard