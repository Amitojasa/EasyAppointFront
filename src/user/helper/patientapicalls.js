import { API } from "../../backend";

export const createPatient = (userId, token, user) => {
    return fetch(`${API}/patient/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            // "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: user
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getPatients = (userId, token) => {
    return fetch(`${API}/patients/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            // "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const deletePatient = (patientId, userId, token) => {
    return fetch(`${API}/patient/${patientId}/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getPatient = (PatientId, UserId, token) => {
    return fetch(`${API}/patient/${PatientId}/${UserId}`, {
        method: "GET",
        headers: {

            Authorization: `Bearer ${token}`
        },
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

// //update a user
export const updatePatient = (toUpdatePatientId, userId, token, patient) => {
    return fetch(`${API}/patient/${toUpdatePatientId}/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            // "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: patient
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
