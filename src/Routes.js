import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import AdminRoute from "./auth/helper/ManagerRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import UserDashboard from "./user/UserDashBoard";
import DoctorDashboard from "./user/DoctorDashBoard";
import ManagerDashboard from "./user/ManagerDashBoard";
import AdminDashboard from "./user/AdminDashBoard";
import ManagerRoute from "./auth/helper/ManagerRoutes";
import DoctorRoute from "./auth/helper/DoctorRoutes";

function Routes() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/signin" exact component={Signin} />
                <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
                <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
                <DoctorRoute path="/doctor/dashboard" exact component={DoctorDashboard} />
                <ManagerRoute path="/manager/dashboard" exact component={ManagerDashboard} />

            </Switch>
        </Router>
    );
}

export default Routes;
