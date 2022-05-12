import { getAppointments } from "../helper/patientapicalls"
import { useEffect, useState } from "react"
import { isAuthenticated } from "../../auth/helper";
import Base from "../../core/Base";
import './viewappointment.css'

const MyAppointments = ({ match }) => {

    const { user, token } = isAuthenticated();
    const [isLoading, setIsLoading] = useState(true)

    const [appointments, updateAppointments] = useState([])

    useEffect(() => {
        console.log(match)
        getAppointments(match.params.patientId, token)
            .then(data => {
                updateAppointments(data)
                setIsLoading(false)
            })
    }, [])

    return (
        <Base title="My Appointments" description="">
            {isLoading ? (
                <p>Your appointments are being fetched</p>
            ) : (
                appointments.length ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Sr.no</th>
                                <th>Patient Name</th>
                                <th>DOB</th>
                                <th>Status</th>
                                <th>Doctor Name</th>
                                <th>Appointment Date/Time</th>
                                <th>Join Link</th>
                                {/* <th>Action</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map(
                                (appointment, i) => (
                                    <tr className={appointment.status}>
                                        <td>{i + 1}</td>
                                        <td>{appointment.patientId.name}</td>
                                        <td>{appointment.patientId.dob}</td>
                                        <td>{appointment.status}</td>
                                        <td>{appointment.doctorId.name}</td>
                                        <td>{new Date(appointment.appointmentTime).toString()}</td>
                                        {/* <td><button>Cancel</button></td> */}
                                        <td>
                                            {appointment.status=='approved'&&appointment.meetingData?(
                                                <a href={appointment.meetingData.join_url}>Join</a>
                                            ):'N/A'}
                                            
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                ) : (
                    <p>You have no appointments for selected patient</p>
                )
            )}
        </Base>
    )
}

export default MyAppointments
