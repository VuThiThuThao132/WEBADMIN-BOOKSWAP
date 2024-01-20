import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Logout = () => {
    const navigate = useNavigate();
    const { dispatch: authDispatch } = useContext(AuthContext);

    useEffect(() => {
        console.log('Logging out...');
        handleLogout();
    }, [authDispatch, navigate]);

    const handleLogout = async () => {
        try {
            console.log('Logging out...');
            localStorage.removeItem("authTokens");
            localStorage.removeItem("refeshToken");
            authDispatch({ type: 'LOGOUT' });
            navigate('/');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };


    return (
        <div>
            <h2>Logging out...</h2>
        </div>
    );
};

export default Logout;
