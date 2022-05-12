import { useState, useEffect } from 'react'
import Base from '../core/Base'
import { getAllAppointments, updateAppointment, updateAppointmentFee } from './helper/patientsApiCall'
import { isAuthenticated } from '../auth/helper'
import { FormatColorReset } from '@mui/icons-material'
import {Link} from 'react-router-dom'


const ManagerManageAppointments = () => {

    const states = {
        'pending': 'Pending',
        'approved': 'Approved',
        'cancelled': 'Cancelled',
        'declined': 'Declined'
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


    const updateFeeStatus = (hasPaid, appointmentId, index) => {
        //setIsLoading(true)
        updateAppointmentFee(appointmentId, hasPaid, token).
            then(
                data => {
                    let newAppointmentStates = [...appointments]
                    newAppointmentStates[index].hasPaid = hasPaid
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
                                <th>E-mail</th>
                                <th>phone</th>
                                <th>Status</th>
                                <th>Doctor Name</th>
                                <th>Appointment Date/Time</th>
                                <th>Action</th>
                                <th>Payment</th>
                                <th>Meeting Start Link</th>
                                <th>Meeting Join Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map(
                                (appointment, i) => (
                                    <tr className={appointment.status}>
                                        <td>{i + 1}</td>
                                        <td>{appointment.patientId.name}</td>
                                        <td>{appointment.patientId.dob}</td>
                                        <td>{appointment.patientId.addedByRefId?.email}</td>
                                        <td>{appointment.patientId.addedByRefId?.phone}</td>
                                        <td>{appointment.status}</td>
                                        <td>{appointment.doctorId.name}</td>
                                        <td>{new Date(appointment.appointmentTime).toString()}</td>
                                        <td>{appointment.status == 'pending' ? (<>
                                            <button className='btn btn-primary btn-block' onClick={() => { updateStatus('approved', appointment._id, i) }}>Approve</button>
                                            <button className='btn btn-secondary btn-block' onClick={() => { updateStatus('declined', appointment._id, i) }}>Decline</button>
                                        </>) : "N/a"}</td>
                                        <td>{appointment.hasPaid == 'unpaid' ? (<>
                                            <button className='btn btn-primary btn-block' onClick={() => { updateFeeStatus('request', appointment._id, i) }}>Request</button>
                                            <button className='btn btn-secondary btn-block' onClick={() => { updateFeeStatus('cancel', appointment._id, i) }}>Cancel</button>
                                        </>) : appointment.hasPaid == 'request' ? (<>
                                            <button className='btn btn-primary btn-block' onClick={() => { updateFeeStatus('paid', appointment._id, i) }}>Paid</button>
                                            <button className='btn btn-secondary btn-block' onClick={() => { updateFeeStatus('cancel', appointment._id, i) }}>Cancel</button>
                                        </>) : appointment.hasPaid == 'paid' ? 'Paid' : "Cancelled"}</td>
                                        <td>
                                            {appointment.status=='approved'&&appointment.meetingData?(
                                                <a target={"_blank"} href={appointment.meetingData.start_url}>Start URL</a>
                                            ):'N/A'}
                                            
                                        </td>
                                        <td>
                                        {appointment.status=='approved'&&appointment.meetingData?(
                                                <a target={"_blank"} href={appointment.meetingData.join_url}>Join URL</a>
                                            ):'N/A'}
                                        </td>
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

export default ManagerManageAppointments;