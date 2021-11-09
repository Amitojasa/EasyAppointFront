import React, { useState } from 'react'
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { createStaff } from './helper/adminapicall';

function CreateUser() {
    const ref = React.useRef();
    const { user, token } = isAuthenticated();
    const [values, setValues] = useState({
        name: "doc1",
        email: "doc1@gmail.com",
        password: "doc1",
        dob: "1999-11-12",
        gender: "Male",
        photo: "",
        success: false,
        loading: false,
        role: "2",
        address: "bti",
        phone: "41252526",
        error: "",
        createdUser: "",
        getaRedirect: false,
        formData: new FormData()
    });

    const {
        name,
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
        createdUser,
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
        createStaff(user._id, token, formData)
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false });
                    console.log(error);
                } else {
                    ref.current.value = ""
                    setValues({
                        ...values,
                        name: "",
                        email: "",
                        password: "",
                        dob: "",
                        gender: "",
                        error: "",
                        photo: "",
                        address: "",
                        phone: "",
                        success: true,
                        createdUser: data.name,
                        loading: false
                    });
                }
            })
            .catch(console.log("Error in creating user"));
    };

    const creationForm = () => {
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
                            <label className="text-light">Password</label>
                            <input
                                className="form-control"
                                type="password"
                                name="password"
                                placeholder="password"
                                onChange={handleChange("password")}
                                value={password}
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
            style={{ display: createdUser ? "" : "none" }}
        >
            <h4>{createdUser} created successfully</h4>
        </div>
    );
    const errorMessage = () => (
        <div
            className="alert alert-danger mt-3"
            style={{ display: error ? "" : "none" }}
        >
            <h4>User creation failed</h4>
        </div>
    );


    return (
        <Base title="create staff page" description="A page to add staff">
            {successMessage()}
            {errorMessage()}
            {creationForm()}
            {/* <p className="text-white text-center">{JSON.stringify(values)}</p> */}
        </Base>
    )
}

export default CreateUser
