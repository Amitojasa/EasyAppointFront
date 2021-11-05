import React, { useState, useEffect, useCallback } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getUser, updateUser } from "./helper/userapicalls";
import { isAuthenticated } from "../auth/helper/index";
import ChangePassword from "../core/ChangePassword";

const UserProfile = () => {
    const { user, token } = isAuthenticated();
    const [values, setValues] = useState({
        name: "",
        phone: "",
        dob: "",
        gender: "",

        address: "",
        email: "",
        loading: false,
        error: "",
        updatedUser: "",
        getaRedirect: false,

    });

    const {
        name,
        phone,
        dob,
        gender,

        address,
        email,
        loading,
        error,
        updatedUser,
        getaRedirect,

    } = values;

    const [show, setShow] = useState(false);

    const handleClose = useCallback(() => {
        setShow(false);
    }, [show]);

    const handleChangePass = () => setShow(true);

    const HandleShowPassChange = () => {
        return <>{show ? <ChangePassword handleClose={handleClose} /> : null}</>;
    };
    const preload = (userId, token) => {
        getUser(userId, token).then(data => {
            console.log(data);
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: data.name,
                    phone: data.phone,
                    dob: data.dob,
                    gender: data.gender,
                    address: data.address,
                    email: data.email


                });
            }
        });
    };

    useEffect(() => {
        preload(user._id, token);
    }, []);
    const onSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: "", loading: true });
        updateUser(user._id, token, {
            name,
            phone,
            dob,
            gender,
            address,
            email
        })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error });
                } else {
                    setValues({
                        ...values,
                        name: data.name,
                        phone: data.phone,
                        dob: data.dob,
                        gender: data.gender,
                        address: data.address,
                        email: data.email,

                        photo: "",

                        updatedUser: data.name,
                        loading: false,
                        error: "",

                    });
                }
            })
            .catch(err => console.log(err));
    };

    const handleChange = name => event => {
        const value = event.target.value;


        setValues({ ...values, [name]: value });

    };

    const successMessage = () => (
        <div
            className="alert alert-success mt-3"
            style={{ display: updatedUser ? "" : "none" }}
        >
            <h4>{updatedUser} updated successfully</h4>
        </div>
    );
    const errorMessage = () => (
        <div
            className="alert alert-danger mt-3"
            style={{ display: error ? "" : "none" }}
        >
            {error}
            <h4>User updation failed</h4>
        </div>
    );
    const createProductForm = () => (
        <form>

            <div className="form-group">
                <label for="name">Name</label>
                <input
                    type="text"
                    onChange={handleChange("name")}
                    name="name"
                    className="form-control"
                    placeholder="Name"
                    value={name}
                />
            </div>
            <div className="form-group">
                <label for="email">E-mail</label>
                <input
                    type="email"
                    onChange={handleChange("email")}
                    name="email"
                    className="form-control"
                    placeholder="E-mail"
                    value={email}
                />
            </div>
            <div className="form-group">
                <label for="phone">Phone</label>

                <input
                    type="tel"
                    onChange={handleChange("phone")}
                    name="phone"
                    className="form-control"
                    placeholder="Phone"
                    value={phone}
                />
            </div>
            <div className="form-group">
                <label for="dob">Date of Birth</label>
                <input
                    type="date"
                    onChange={handleChange("dob")}
                    name="dob"
                    className="form-control"
                    placeholder="dob"
                    value={dob}
                />
            </div>
            <div class="form-group">
                <label for="sel1">Gender</label>
                <select class="form-control" id="sel1" name="dob"
                    required
                    onChange={handleChange("gender")} value={gender}
                >
                    <option value="">Select Gender</option>
                    <option value="Male"  >Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div className="form-group">
                <label for="address">address</label>
                <textarea
                    onChange={handleChange("address")}
                    name="address"
                    className="form-control"
                    placeholder="Address"
                    value={address}
                />
            </div>




            <button
                type="submit"
                onClick={onSubmit}
                className="btn btn-outline-success mb-3"
            >
                update Profile
            </button>
        </form >
    );


    const changePassword = () => (
        <Link
            // className="dashboard-dash-dlink dashboard-dash-cursor"
            onClick={() => handleChangePass()}
            to="#"
        >
            Change Password
        </Link>
    )

    return (
        <Base
            title="Update your Profile here!"
            description="Welcome to Profile update section"
            className="container bg-info p-4"
        >
            {/* <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
                Admin Home
            </Link> */}
            <div className="row bg-dark text-white rounded">
                <div className="col-md-8 offset-md-2">
                    {HandleShowPassChange()}
                    {successMessage()}
                    {errorMessage()}
                    {changePassword()}
                    {createProductForm()}
                </div>
            </div>
        </Base>
    );
};

export default UserProfile;
