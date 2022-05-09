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
import LabDashboard from "./labs/LabDashBoard";
import LabManageAppointments from "./labs/LabManageAppointments";
import ManageLabPatients from "./labs/ManageLabPatients";
import AdminDashboard from "./admin/AdminDashBoard";
import ManagerRoute from "./auth/helper/ManagerRoutes";
import DoctorRoute from "./auth/helper/DoctorRoutes";
import UserProfile from "./user/UserProfile";
import CreateUser from "./admin/CreateUser";
import ManageStaff from "./admin/ManageStaff";
import UpdateUser from "./admin/UpdateUser";
import AddPatient from "./user/AddPatient";
import ManagePatient from "./user/ManagePatient";
import UpdatePatient from "./user/UpdatePatient";
import ManageDoctorPatient from "./doctor/ManageDoctorPatients";
import ManageManagerPatients from "./manager/ManageManagerPatients";
import NewAppointment from "./user/BookAppointment/newAppointment";
import MyAppointments from "./user/BookAppointment/myAppointments";
import CreateTest from "./admin/CreateTest";
import ManageTests from "./admin/ManageTest";
import UpdateTest from "./admin/UpdateTest";
import BookTest from "./user/BookTest";

import ManagerManageAppointments from './manager/ManagerManageAppointments'
import DoctorAppointments from "./doctor/DoctorAppointments";
import LabRoute from "./auth/helper/LabRoutes";
import fail from "./core/fail";
import success from "./core/success";
import Payments from "./user/Payments";

function Routes() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/getSuccess" exact component={success}></Route>
                <Route path="/getFailure" exact component={fail}></Route>

                <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
                <AdminRoute path="/admin/managestaff" exact component={ManageStaff} />
                <AdminRoute path="/admin/user/update/:userId" exact component={UpdateUser} />
                <AdminRoute path="/admin/createuser" exact component={CreateUser} />
                <AdminRoute path="/admin/test/create" exact component={CreateTest} />
                <AdminRoute path="/admin/managetests" exact component={ManageTests} />
                <AdminRoute path="/admin/test/update/:testId" exact component={UpdateTest} />
                <DoctorRoute path="/doctor/dashboard" exact component={DoctorDashboard} />
                <DoctorRoute path="/doctor/managepatients" exact component={ManageDoctorPatient} />
                <DoctorRoute path="/doctor/manageappointments" exact component={DoctorAppointments} />

                <ManagerRoute path="/manager/dashboard" exact component={ManagerDashboard} />
                <ManagerRoute path="/manager/managepatients" exact component={ManageManagerPatients} />
                <ManagerRoute path="/manager/manageappointments" exact component={ManagerManageAppointments} />

                <LabRoute path="/lab/dashboard" exact component={LabDashboard} />
                <LabRoute path="/lab/managepatients" exact component={ManageLabPatients} />
                <LabRoute path="/lab/manageappointments" exact component={LabManageAppointments} />
                <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
                <PrivateRoute path="/user/profile" exact component={UserProfile} />
                <PrivateRoute path="/user/addpatient" exact component={AddPatient} />
                <PrivateRoute path="/user/managepatients" exact component={ManagePatient} />
                <PrivateRoute path="/user/bookTest" exact component={BookTest} />
                <PrivateRoute path="/user/payment" exact component={Payments} />
                <PrivateRoute path="/patient/update/:patientId" exact component={UpdatePatient} />
                <PrivateRoute path="/patient/:patientId/appointments/create" exact component={NewAppointment} />
                <PrivateRoute path="/patient/:patientId/appointments" exact component={MyAppointments} />
            </Switch>
        </Router>
    );
}

export default Routes;
