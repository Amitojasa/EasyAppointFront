import { API } from "../../backend";


export const getUser = (userId, token) => {
    return fetch(`${API}/user/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",

            Authorization: `Bearer ${token}`
        },
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const updateUser = (userId, token, data) => {
    return fetch(`${API}/user/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)

    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const bookTest = (userId, token, data) => {
    return fetch(`${API}/user/booktest/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)

    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const payitback = (userId, token, b) => {
    return fetch(`${API}/payment/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(b)


    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};