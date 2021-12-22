import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { createPatient } from './helper/patientapicalls';
// import { createStaff } from './helper/adminapicall';

function AddPatient() {
    // const ref = React.useRef();
    const { user, token } = isAuthenticated();
    const [values, setValues] = useState({
        name: "",
        dob: "",
        gender: "",
        success: false,
        loading: false,
        error: "",
        createdPatient: "",
        getaRedirect: false,
        formData: new FormData()
    });

    const {
        name,
        dob,
        gender,
        error,

        success,
        loading,


        createdPatient,
        getaRedirect,

        formData } = values;

    const handleChange = name => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };


    const onSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: "", loading: true });
        createPatient(user._id, token, formData)
            .then(data => {
                console.log(data);
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false });
                    console.log(error);
                } else {
                    // ref.current.value = ""
                    setValues({
                        ...values,
                        name: "",
                        dob: "",
                        gender: "",
                        error: "",
                        success: true,
                        createdPatient: data.name,
                        loading: false
                    });
                }
            })
            .catch(err => console.log("Error in creating patient"));
    };

    const creationForm = () => {
        return (
            <div className="row">
                <div className="offset-sm-3 col-md-6 text-left">
                    <form action="">
                        {/* <span>Post photo</span>
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
                        </div> */}
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
                        <div className="form-group">
                            <label for="sel1">Gender</label>
                            <select className="form-control" id="sel1" name="dob"
                                required
                                onChange={handleChange("gender")}
                                value={gender} >
                                <option value="">Select Gender</option>
                                <option value="Male"  >Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
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
            style={{ display: createdPatient ? "" : "none" }}
        >
            <h4>{createdPatient} created successfully</h4>
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
        <Base title="create Patient page" description="Add patient">
            <Link className="btn btn-info" to={`/user/dashboard`}>
                <span className="">User Home</span>
            </Link>
            {successMessage()}
            {errorMessage()}
            {loading && <p>Loading...</p>}
            {creationForm()}
            {/* <p className="text-white text-center">{JSON.stringify(values)}</p> */}
        </Base>
    )
}

export default AddPatient
