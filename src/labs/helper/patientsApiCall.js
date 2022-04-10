import { API } from "../../backend";

export const getAllAppointments = (status, token) => {
    return fetch(`${API}/alllabappointments/${status}`, {
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
    return fetch(`${API}/labappointment/${appointmentId}/${status}`,
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