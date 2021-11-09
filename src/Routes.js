import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./core/Signup";
import Signin from "./core/Signin";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import UserDashboard from "./user/UserDashBoard";
import DoctorDashboard from "./doctor/DoctorDashBoard";
import ManagerDashboard from "./manager/ManagerDashBoard";
import AdminDashboard from "./admin/AdminDashBoard";
import ManagerRoute from "./auth/helper/ManagerRoutes";
import DoctorRoute from "./auth/helper/DoctorRoutes";
import UserProfile from "./user/UserProfile";
import CreateUser from "./admin/CreateUser";

function Routes() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/signin" exact component={Signin} />

                <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
                <AdminRoute path="/admin/createuser" exact component={CreateUser} />
                <DoctorRoute path="/doctor/dashboard" exact component={DoctorDashboard} />
                <ManagerRoute path="/manager/dashboard" exact component={ManagerDashboard} />
                <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
                <PrivateRoute path="/user/profile" exact component={UserProfile} />
            </Switch>
        </Router>
    );
}

export default Routes;
