import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { getDoctors, getManagers, deleteUser } from "./helper/adminapicall";
export default function ManageStaff(props) {
    const [users, setUsers] = useState([]);
    const [usersSize, setUsersSize] = useState(0)
    const { user, token } = isAuthenticated();

    const [userType, setUserType] = useState("")


    useEffect(() => {
        setUsersSize(users.length)
    }, [users])

    const preLoad = (role) => {
        // console.log(role)
        if (role == 2) {
            setUserType('Doctors')
            getDoctors().then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    setUsers(data);
                }
            });
        } else if (role == 1) {
            setUserType('Managers')
            getManagers().then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    setUsers(data);
                }
            });
        }
    };

    useEffect(() => {
        // console.log(props.location)
        preLoad(props.location.state.role);
    }, []);

    const deleteThisUser = userId => {
        deleteUser(userId, user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                preLoad();
            }
        });
    };

    return (
        <Base title="Welcome admin" description="Manage users here">
            <h2 className="mb-4">All {userType}:</h2>
            <Link className="btn btn-info" to={`/admin/dashboard`}>
                <span className="">Admin Home</span>
            </Link>
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center text-white my-3">Total {usersSize} users</h2>

                    {users.map((users, index) => {
                        return (
                            <div key={index} className="row text-center mb-2 ">
                                <div className="col-4">
                                    <h3 className="text-white text-left">{users.name}</h3>
                                </div>
                                <div className="col-4">
                                    <Link
                                        className="btn btn-success"
                                        to={`/admin/user/update/${users._id}`}
                                    >
                                        <span className="">Update</span>
                                    </Link>
                                </div>
                                <div className="col-4">
                                    <button
                                        onClick={() => {
                                            deleteThisUser(users._id);
                                        }}
                                        className="btn btn-danger"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Base>
    );
}
