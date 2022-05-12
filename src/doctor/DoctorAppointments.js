import React, { useEffect, useState, useCallback } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper/index";
import { Link } from "react-router-dom";
import '../core/user.css'
import { getAllDoctorsAppointment } from "./helper/doctorapicalls";
import DoctorPrescribtion from "./DoctorPrescribtion";
const DoctorAppointments = () => {
    const {
        user, token
    } = isAuthenticated();

    var srNo = 0;

    const today = new Date();

    const todaysDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    const [PrescribtionPatientId, setPrescribtionPatientId] = useState(null)
    const [patientPrescribtion, setPatientPrescribtion] = useState("")


    const [isLoading, setIsLoading] = useState(true)
    const [appointments, updateAppointments] = useState([])

    useEffect(() => {
        setIsLoading(true)
        getAllDoctorsAppointment(user._id, token)
            .then(
                data => {
                    updateAppointments(data)
                    setIsLoading(false)
                }
            )
    }, [])




    const [show, setShow] = useState(false);

    const handleClose = useCallback(() => {
        setShow(false);
    }, [show]);

    const handlePrescribtion = (pid, pres) => {
        setShow(true);
        setPrescribtionPatientId(pid);
        setPatientPrescribtion(pres);
    }

    const HandlePrescribtionShow = () => {
        return <>{show ? <DoctorPrescribtion handleClose={handleClose} patientId={PrescribtionPatientId} patientPres={patientPrescribtion} /> : null}</>;
    };


    return (
        <Base
            title="Upcoming appointments(Doctor Panel)"
            description="Manage all your appointments here"

        > {HandlePrescribtionShow()}
            {isLoading ? (
                <p>Your appointments are being fetched</p>
            ) : (
                appointments.length ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Sr.no</th>
                                <th>Patient Id</th>
                                <th>Patient Name</th>
                                <th>DOB</th>
                                <th>E-mail</th>
                                <th>Phone   </th>
                                <th>Status</th>
                                <th>Doctor Name</th>
                                <th>Appointment Date/Time</th>
                                <th>Action</th>
                                <th>Start Meet</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map(
                                (appointment, i) => {
                                    var d;
                                    {
                                        let cd = new Date(appointment.appointmentTime);
                                        d = cd.getFullYear() + '-' + (cd.getMonth() + 1) + '-' + cd.getDate();

                                    }
                                    if (d == todaysDate && appointment.status == 'approved') {
                                        srNo++;
                                        return <tr className={appointment.status}>
                                            <td>{srNo}</td>
                                            <td>{appointment.patientId.patientId}</td>
                                            <td>{appointment.patientId.name}</td>
                                            <td>{appointment.patientId.dob}</td>
                                            <td>{appointment.patientId.addedByRefId?.email}</td>
                                            <td>{appointment.patientId.addedByRefId?.phone}</td>
                                            <td>{appointment.status}</td>
                                            <td>{appointment.doctorId.name}</td>
                                            <td>{new Date(appointment.appointmentTime).toString()}</td>
                                            <td><button
                                                onClick={() => handlePrescribtion(appointment.patientId._id, appointment.patientId?.prescribtion)}
                                                className="btn btn-danger"
                                            >
                                                Prescribtion
                                            </button></td>
                                            <td>
                                            {appointment.status=='approved'&&appointment.meetingData?(
                                                <a href={appointment.meetingData.start_url}>Start</a>
                                            ):'N/A'}
                                            
                                            </td>
                                        </tr>

                                    }
                                }
                            )}
                        </tbody>
                    </table>
                ) : (
                    <p>You have no appointments for selected patient</p>
                )
            )}

        </Base >
    );
};

export default DoctorAppointments;
