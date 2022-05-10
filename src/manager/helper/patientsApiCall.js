import { API } from "../../backend";

export const getAllAppointments = (status, token) => {
    return fetch(`${API}/allappointments/${status}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            // "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const getAllMyAppointments = (userId, token) => {
    return fetch(`${API}/allmyappointments/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            // "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const updateAppointment = (appointmentId, status, token) => {
    return fetch(`${API}/appointment/${appointmentId}/${status}`,
        {
            method: 'PUT',
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                appointmentId, status
            })
        }
    )
        .then(
            response => {
                return response.json()
            }
        )
}

export const updateAppointmentFee = (appointmentId, hasPaid, token) => {
    return fetch(`${API}/appointment/fee/${appointmentId}/${hasPaid}`,
        {
            method: 'PUT',
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                appointmentId, hasPaid
            })
        }
    )
        .then(
            response => {
                return response.json()
            }
        )
}


