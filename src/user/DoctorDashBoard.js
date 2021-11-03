import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper/index";
import { Link } from "react-router-dom";
const DoctorDashboard = () => {
    const {
        user: { name, email, role }
    } = isAuthenticated();



    return (
        <Base
            title="Doctor Dashboard"
            description="Manage all your patients here"
            className="container bg-success p-4"
        >

        </Base>
    );
};

export default DoctorDashboard;
