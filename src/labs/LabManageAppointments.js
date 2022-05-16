import { useState, useEffect } from 'react'
import Base from '../core/Base'
import { getAllAppointments, updateAppointment } from './helper/patientsApiCall'
import { isAuthenticated } from '../auth/helper'
import { FormatColorReset } from '@mui/icons-material'


const LabManageAppointments = () => {

    const states = {
        'pending': 'Pending',
        'declined': 'Declined',
        'approved': 'Approved',
        'in-progress': 'In Progress',
        'completed': 'Completed'
    }
    const [status, setStatus] = useState('pending')
    const { user, token } = isAuthenticated()

    const [appointments, updateAppointments] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [updatedState, setUpdatedState] = useState(1)

    useEffect(() => {
        setIsLoading(true)
        getAllAppointments(status, token)
            .then(
                data => {
                    console.log(data)
                    updateAppointments(data)
                    setIsLoading(false)
                }
            )


    }, [status, updatedState])

    const updateStatus = (status, appointmentId, index) => {
        //setIsLoading(true)
        updateAppointment(appointmentId, status, token).
            then(
                data => {
                    let newAppointmentStates = [...appointments]
                    newAppointmentStates[index].status = status
                    updateAppointments(newAppointmentStates)
                    //setUpdatedState(updatedState+1)
                    //setIsLoading(false)
                }

            )
    }




    return (
        <Base title="Manage Appointments" description="">
            <div className='filter-title'>Filter Appointments</div>
            <div className='status-filter'>
                {Object.keys(states).map(state => (
                    <button onClick={() => { setStatus(state) }}>{states[state]}</button>
                ))}
            </div>
            {isLoading ? (
                <p>{status} appointments are being fetched</p>
            ) : (
                appointments.length ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Sr.no</th>
                                <th>Patient Name</th>
                                <th>DOB</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Status</th>
                                <th>Test Name</th>
                                <th>Appointment Date/Time</th>
                                {<th>Action</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map(
                                (appointment, i) => (
                                    <tr className={appointment.status}>
                                        <td>{i + 1}</td>
                                        <td>{appointment.patientId.name}</td>
                                        <td>{appointment.patientId.dob}</td>
                                        <td>{appointment.patientId.addedByRefId.email}</td>
                                        <td>{appointment.patientId.addedByRefId?.phone}</td>
                                        <td>{appointment.status}</td>
                                        <td>{appointment.testId.testName}</td>
                                        <td>{new Date(appointment.appointmentTime).toString()}</td>
                                        <td>{appointment.status == 'pending' ? (<>
                                            <button onClick={() => { updateStatus('approved', appointment._id, i) }}>Approve</button>
                                            <button onClick={() => { updateStatus('declined', appointment._id, i) }}>Decline</button>
                                        </>) : appointment.status == 'approved' ? (<>
                                            <button onClick={() => { updateStatus('in-progress', appointment._id, i) }}>Mark Start/In progress</button>
                                            {/* <button onClick={() => { updateStatus('declined', appointment._id, i) }}>Decline</button> */}
                                        </>) : appointment.status == 'in-progress' ? (<>
                                            <button onClick={() => { updateStatus('completed', appointment._id, i) }}>Mark Completed</button>
                                            {/* <button onClick={() => { updateStatus('declined', appointment._id, i) }}>Decline</button> */}
                                        </>) : "NA"}</td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                ) : (
                    <p>We have no {status} booking</p>
                )
            )}
        </Base>
    )
}

export default LabManageAppointments;