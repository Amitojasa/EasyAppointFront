import { API } from "../../backend";

// //category calls
// export const createCategory = (userId, token, category) => {
//   return fetch(`${API}/category/create/${userId}`, {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`
//     },
//     body: JSON.stringify(category)
//   })
//     .then(response => {
//       return response.json();
//     })
//     .catch(err => console.log(err));
// };

// export const getCategories = () => {
//   return fetch(`${API}/categories`, {
//     method: "GET"
//   })
//     .then(response => {
//       return response.json();
//     })
//     .catch(err => console.log(err));
// };
// export const getCategory = categoryId => {
//   return fetch(`${API}/category/${categoryId}`, {
//     method: "GET"
//   })
//     .then(response => {
//       return response.json();
//     })
//     .catch(err => console.log(err));
// };

// export const updateCategory = (categoryId, userId, token, category) => {
//   return fetch(`${API}/category/${categoryId}/${userId}`, {
//     method: "PUT",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`
//     },
//     body: JSON.stringify(category)
//   })
//     .then(response => {
//       return response.json();
//     })
//     .catch(err => console.log(err));
// };

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

// export const deleteCategory = (categoryId, userId, token) => {
//   return fetch(`${API}/category/${categoryId}/${userId}`, {
//     method: "DELETE",
//     headers: {
//       Accept: "application/json",
//       Authorization: `Bearer ${token}`
//     }
//   })
//     .then(response => {
//       return response.json();
//     })
//     .catch(err => console.log(err));
// };
