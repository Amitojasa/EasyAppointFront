import { getAppointments } from "../helper/patientapicalls"
import { useEffect, useState } from "react"
import { isAuthenticated } from "../../auth/helper";
import Base from "../../core/Base";
import './viewappointment.css'

const MyAppointments=({match})=>{

    const { user, token } = isAuthenticated();
    const [isLoading,setIsLoading]=useState(true)

    const [appointments,updateAppointments]=useState([])

    useEffect(()=>{
        console.log(match)
        getAppointments(match.params.patientId,token)
            .then(data=>{
                updateAppointments(data)
                setIsLoading(false)
            })
    },[])

    return (
        <Base title="My Appointments" description="">
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
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map(
                                (appointment,i)=>(
                                    <tr className={appointment.isApproved?'approved':'pending'}>
                                        <td>{i+1}</td>
                                        <td>{appointment.patientId.name}</td>
                                        <td>{appointment.patientId.dob}</td>
                                        <td>{appointment.isApproved?'Confirmed':'Pending'}</td>
                                        <td>{appointment.doctorId.name}</td>
                                        <td>{appointment.appointmentTime}</td>
                                        <td><button>Cancel</button></td>
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
    )
}

export default MyAppointments
