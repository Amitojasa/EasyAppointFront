import { API } from "../../backend";

export const getAllPatients = (userId, token) => {
    return fetch(`${API}/allpatients/${userId}`, {
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



