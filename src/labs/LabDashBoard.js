import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper/index";
import { Link } from "react-router-dom";
import '../core/user.css'
const LabDashboard = () => {
    const {
        user: { name, email, role }
    } = isAuthenticated();



    return (
        <Base
            title="Lab Attendant Dashboard"
            description="Manage all your patients here"

        >
            <ul className="user-menu">
                <li className="nav-item">
                    <Link


                        to="/lab/managepatients"
                    >
                        Manage patients
                    </Link>
                </li>
                <li className="nav-item">
                    <Link


                        to="/lab/manageappointments"
                    >
                        Manage Appointments
                    </Link>
                </li>
            </ul>
        </Base>
    );
};

export default LabDashboard;
