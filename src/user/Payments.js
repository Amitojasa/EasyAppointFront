import React, { useEffect, useState } from 'react'
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base'
import { getAllAppointments, updateAppointmentFee } from '../manager/helper/patientsApiCall';
import { payitback, updateUser } from './helper/userapicalls';

function Payments() {

    const { user, token } = isAuthenticated();

    // const [hasPaidEntry, setHasPaidEntry] = useState(user.hasPaidEntry)

    const [error, setError] = useState(null);

    const [status, setStatus] = useState('pending')

    const [appointments, updateAppointments] = useState([])
    const [isLoading, setIsLoading] = useState(true)


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

        preLoad();

    }, [])


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





    const [val, setval] = useState({})
    const preLoad = async () => {
        const d = await payitback(user._id, token, { productInfo: "Appointment", entryFee: 200 });

        setval(d);

    };



    function launchBOLT(apId, i) {
        console.log(val)
        window.bolt.launch({
            key: val.key,
            // salt: val.salt,
            txnid: val.txnid.toString(),
            hash: val.hash,
            amount: val.amount,
            firstname: val.firstname,
            email: val.email,
            phone: val.phone,
            productinfo: val.productinfo,
            udf5: val.udf5,
            surl: val.surl,
            furl: val.furl
        }, {
            responseHandler: function (BOLT) {
                if (BOLT.response.txnStatus !== 'CANCEL') {

                    console.log("Success");
                    updateFeeStatus('paid', apId, i)
                    // updateUser(user._id, token, { hasPaidEntry: true }).then(data => {
                    //     if (data.error) {
                    //         setError(data.error);
                    //     }
                    // }).catch(err => console.log(err))
                }

            },
            catchException: function (BOLT) {
                setError(JSON.stringify(BOLT));
            }
        });
    }
    const payForm = (i, apId) => {
        return (

            < input key={i} onClick={() => launchBOLT(apId, i)} value="Pay" type="button" />

        )
    }

    return (
        <Base title="User Appointments" description="">

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
                                {<th>Action</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map(
                                (appointment, i) => (
                                    <tr className={appointment.status} key={i}>
                                        <td>{i + 1}</td>
                                        <td>{appointment.patientId.name}</td>
                                        <td>{appointment.patientId.dob}</td>
                                        <td>{appointment.patientId.addedByRefId?.email}</td>
                                        <td>{appointment.patientId.addedByRefId?.phone}</td>
                                        <td>{appointment.status}</td>
                                        <td>{appointment.doctorId.name}</td>
                                        <td>{new Date(appointment.appointmentTime).toString()}</td>
                                        <td>{appointment.status == 'paid' ? "Paid"

                                            : (payForm(i, appointment._id))}</td>

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







export default Payments;
