import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
            withCredentials: true
        })
        .then(() => {
            setIsAuth(true);
        })
        .catch(() => {
            setIsAuth(false);
        })
        .finally(() => {
            setLoading(false);
        });
    }, []);

    if (loading) return <div>Checking auth...</div>;
    return children;
    // return isAuth ? children : <Navigate to="/auth" />;
};

export default ProtectedRoute;