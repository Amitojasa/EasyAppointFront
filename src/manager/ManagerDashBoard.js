import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper/index";
import { Link } from "react-router-dom";
import '../core/user.css'
const ManagerDashboard = () => {
    const {
        user: { name, email, role }
    } = isAuthenticated();



    return (
        <Base
            title="Manager Dashboard"
            description="Manage all your patients here"

        >
            <ul className="user-menu">
                <li className="nav-item">
                    <Link


                        to="/manager/managepatients"
                    >
                        Manage patients
                    </Link>
                </li>
                <li className="nav-item">
                    <Link


                        to="/manager/managebookings"
                    >
                        Manage Bookings
                    </Link>
                </li>
            </ul>
        </Base>
    );
};

export default ManagerDashboard;
