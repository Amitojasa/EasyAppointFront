import { API } from "../../backend";

// //test calls
export const createTest = (userId, token, test) => {
    return fetch(`${API}/test/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(test)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getTests = () => {
    return fetch(`${API}/test/getall`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const getTest = testId => {
    return fetch(`${API}/test/get/${testId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const updateTest = (testId, userId, token, test) => {
    return fetch(`${API}/test/update/${testId}/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(test)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

// //User calls

//create User
export const createStaff = (userId, token, user) => {
    return fetch(`${API}/user/create/${userId}`, {
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

// //get all products
export const getManagers = () => {
    return fetch(`${API}/users/managers`, {
        method: "GET",

    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const getLabattendants = () => {
    return fetch(`${API}/users/labattendants`, {
        method: "GET",

    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getDoctors = () => {
    return fetch(`${API}/users/doctors`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const getUsers = () => {
    return fetch(`${API}/users`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

// //get a product

export const getUser = (UserId, adminUserId, token) => {
    return fetch(`${API}/user/${UserId}/${adminUserId}`, {
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
export const updateUser = (toUpdateUserId, userId, token, user) => {
    return fetch(`${API}/user/${toUpdateUserId}/${userId}`, {
        method: "PUT",
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

// //delete a product
export const deleteUser = (productId, userId, token) => {
    return fetch(`${API}/user/${productId}/${userId}`, {
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

export const deleteTest = (testId, userId, token) => {
    return fetch(`${API}/test/delete/${testId}/${userId}`, {
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
