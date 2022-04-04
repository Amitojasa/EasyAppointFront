import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper/index";
import { Link } from "react-router-dom";
import '../core/user.css'
import { getAllDoctorsAppointment } from "./helper/doctorapicalls";

const DoctorAppointments = () => {
    const {
        user,token
    } = isAuthenticated();

    const [isLoading,setIsLoading]=useState(true)
    const [appointments,updateAppointments]=useState([])

    useEffect(()=>{
        setIsLoading(true)
        getAllDoctorsAppointment(user._id,token)
            .then(
                data=>{
                    updateAppointments(data)
                    setIsLoading(false)
                }
            )
    },[])

    return (
        <Base
            title="Upcoming appointments(Doctor Panel)"
            description="Manage all your appointments here"

        >
        {isLoading?(
                <p>Your appointments are being fetched</p>
            ):(
                appointments.length?(
                    <table>
                        <thead>
                            <tr>
                                <th>Sr.no</th>
                                <th>Patient Name</th>
                                <th>DOB</th>
                                <th>Status</th>
                                <th>Doctor Name</th>
                                <th>Appointment Date/Time</th>
                                {/* <th>Action</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map(
                                (appointment,i)=>(
                                    <tr className={appointment.status}>
                                        <td>{i+1}</td>
                                        <td>{appointment.patientId.name}</td>
                                        <td>{appointment.patientId.dob}</td>
                                        <td>{appointment.status}</td>
                                        <td>{appointment.doctorId.name}</td>
                                        <td>{appointment.appointmentTime}</td>
                                        {/* <td><button>Cancel</button></td> */}
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                ):(
                    <p>You have no appointments for selected patient</p>
                )
            )}
           
        </Base>
    );
};

export default DoctorAppointments;
