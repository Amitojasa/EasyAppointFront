import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper/index";
import { Link } from "react-router-dom";
const ManagerDashboard = () => {
    const {
        user: { name, email, role }
    } = isAuthenticated();



    return (
        <Base
            title="Manager Dashboard"
            description="Manage all your patients here"
            className="container bg-success p-4"
        >

        </Base>
    );
};

export default ManagerDashboard;
