import React, { useEffect, useState } from 'react'
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';

import { updateUser, getUser } from './helper/adminapicall';

function CreateUser({ match }) {
    const ref = React.useRef();
    const { user, token } = isAuthenticated();
    const [values, setValues] = useState({
        userId: "",
        name: "",
        email: "",
        password: "",
        dob: "",
        gender: "",
        photo: "",
        success: false,
        loading: false,
        role: "",
        address: "",
        phone: "",
        error: "",
        updatedUser: "",
        getaRedirect: false,
        formData: new FormData()
    });

    const {
        name,
        userId,
        email,
        password,
        dob,
        gender,
        error,
        phone,
        success,
        loading,
        photo,
        role,
        updatedUser,
        getaRedirect,
        address,
        formData } = values;

    const handleChange = name => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };


    const onSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: "", loading: true });
        updateUser(userId, user._id, token, formData)
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false });
                    console.log(error);
                } else {
                    ref.current.value = ""

                    setValues({
                        ...values,
                        name: data.name,
                        phone: data.phone,
                        dob: data.dob,
                        gender: data.gender,
                        address: data.address,
                        email: data.email,
                        photo: data.photo,
                        role: data.role,
                        error: "",
                        success: true,
                        updatedUser: data.name,
                        loading: false,
                        formData: new FormData()
                    });
                    // console.log("panga")
                }
            })
            .catch(err => console.log(err + "Error in updating user!!!"));
    };
    const preload = userId => {
        getUser(userId, user._id, token).then(data => {

            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {

                setValues({
                    ...values,

                    // formData: new FormData(),
                    userId: data._id,
                    name: data.name,
                    phone: data.phone,
                    dob: data.dob,
                    gender: data.gender,
                    address: data.address,
                    email: data.email,
                    photo: data.photo,
                    role: data.role
                });
            }
        });
    };

    useEffect(() => {
        preload(match.params.userId);
    }, []);
    const updationForm = () => {
        return (
            <div className="row">
                <div className="offset-sm-3 col-md-6 text-left">
                    <form action="">
                        <span>Post photo</span>
                        <div className="form-group">
                            <label className="btn btn-block btn-success">
                                <input
                                    onChange={handleChange("photo")}
                                    type="file"
                                    name="photo"
                                    accept="image"
                                    placeholder="choose a file"
                                    ref={ref}
                                />
                            </label>
                        </div>
                        <div className="form-group">
                            <label className="text-light">Name</label>
                            <input
                                className="form-control"
                                type="text"
                                name="name"
                                placeholder="Name"
                                onChange={handleChange("name")}
                                value={name}
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light">DOB</label>
                            <input
                                className="form-control"
                                type="date"
                                name="dob"
                                placeholder="DOB"
                                onChange={handleChange("dob")}
                                value={dob}
                            />
                        </div>
                        <div class="form-group">
                            <label for="sel1">Gender</label>
                            <select class="form-control" id="sel1" name="dob"
                                required
                                onChange={handleChange("gender")}
                                value={gender} >
                                <option value="">Select Gender</option>
                                <option value="Male"  >Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="text-light">E-mail</label>
                            <input
                                className="form-control"
                                type="email"
                                name="email"
                                placeholder="E-mail"
                                onChange={handleChange("email")}
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
                            <label for="address">address</label>
                            <textarea
                                onChange={handleChange("address")}
                                name="address"
                                className="form-control"
                                placeholder="Address"
                                value={address}
                            />
                        </div>
                        <div class="form-group">
                            <label for="sel2">Role</label>
                            <select class="form-control" id="sel2" name="role"
                                required
                                onChange={handleChange("role")}
                                value={role} >
                                <option value="">Select Role</option>
                                <option value="2"  >Doctor</option>
                                <option value="1">Manager</option>

                            </select>
                        </div>
                        <button onClick={onSubmit} className="btn btn-success btn-block">
                            Submit
                        </button>
                    </form>
                </div >
            </div >
        );
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
            <h4>User updation failed</h4>
        </div>
    );


    return (
        <Base title="update staff page" description="A page to add staff">
            {successMessage()}
            {errorMessage()}
            {updationForm()}
            {/* <p className="text-white text-center">{JSON.stringify(values)}</p> */}
        </Base>
    )
}

export default CreateUser
