import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper/index";
import { Link } from "react-router-dom";
import '../core/user.css'
const DoctorDashboard = () => {
    const {
        user: { name, email, role }
    } = isAuthenticated();



    return (
        <Base
            title="Doctor Dashboard"
            description="Manage all your patients here"

        >
            <ul className="user-menu">
                <li className="nav-item">
                    <Link


                        to="/doctor/managepatients"
                    >
                        Manage patients
                    </Link>
                </li>
                <li className="nav-item">
                    <Link


                        to="/doctor/manageappointments"
                    >
                        Manage appointments
                    </Link>
                </li>
            </ul>
        </Base>
    );
};

export default DoctorDashboard;
